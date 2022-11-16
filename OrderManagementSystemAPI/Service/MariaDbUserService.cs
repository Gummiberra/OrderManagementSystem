using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public class MariaDbUserService : IMariaDbUserService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbUserService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.User.Remove(new Model.User { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }

        public async Task<IEnumerable<User>> FindAll()
        {
            return await _dbContext.User.ToListAsync();
        }

        public async Task<User> FindOne(int id)
        {
            return await _dbContext.User.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> FindOneByUsername(string username)
        {
            return await _dbContext.User.FirstOrDefaultAsync(x => x.Username == username);
        }

        public async Task<User> Authenticate(User user) {
            return await _dbContext.User.FirstOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password);
        }

        public async Task<int> Insert(User user)
        {
            try
            {
                _dbContext.Add(user);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            { 
                Console.WriteLine(e);
                return 0;
            }
        }

        public async Task<int> Update(User user)
        {
            try
            {
                _dbContext.Update(user);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }
    }
}
