using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public class MariaDbCustomerService : IMariaDbCustomerService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbCustomerService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.Customer.Remove(new Customer { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }

        public async Task<IEnumerable<Customer>> FindAll()
        {
            return await _dbContext.Customer.ToListAsync();
        }

        public async Task<Customer> FindOne(int id)
        {
            return await _dbContext.Customer.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(Customer cus)
        {
            _dbContext.Add(cus);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(Customer cus)
        {
            try
            {
                _dbContext.Update(cus);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }

        }
    }
}
