using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public class MariaDbOrderItemService : IMariaDbOrderItemService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbOrderItemService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.OrderItem.Remove(new Model.OrderItem { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }

        public async Task<IEnumerable<OrderItem>> FindAll()
        {
            return await _dbContext.OrderItem.ToListAsync();
        }

        public async Task<OrderItem> FindOne(int id)
        {
            return await _dbContext.OrderItem.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(OrderItem item)
        {
            _dbContext.Add(item);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(OrderItem item)
        {
            try
            {
                _dbContext.Update(item);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }

        }
    }
}
