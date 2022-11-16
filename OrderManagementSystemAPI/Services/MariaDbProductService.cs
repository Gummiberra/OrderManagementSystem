using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public class MariaDbProductService : IMariaDbProductService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbProductService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.Product.Remove(new Model.Product { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }

        public async Task<IEnumerable<Product>> FindAll()
        {
            return await _dbContext.Product.ToListAsync();
        }

        public async Task<Product> FindOne(int id)
        {
            return await _dbContext.Product.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(Product prod)
        {
            _dbContext.Add(prod);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(Product prod)
        {
            try
            {
                _dbContext.Update(prod);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }

        }
    }

}
