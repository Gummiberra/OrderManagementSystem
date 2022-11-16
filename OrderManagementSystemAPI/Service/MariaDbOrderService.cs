using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public sealed class MariaDbOrderService : IMariaDbOrderService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbOrderService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.Order.Remove(new Model.Order { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            { 
                return 0;
            }
        }

        public async Task<IEnumerable<Order>> FindAll()
        {
            return await _dbContext.Order.ToListAsync();
        }

        public async Task<Order> FindOne(int id)
        {
            return await _dbContext.Order.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(Order order)
        {
            _dbContext.Add(order);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(Order order)
        {
            try
            {
                _dbContext.Update(order);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }
    }
}
