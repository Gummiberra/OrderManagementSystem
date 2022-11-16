using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Service
{
    public sealed class MariaDbOrganizationService : IMariaDbOrganizationService
    {
        private readonly MariaDbContext _dbContext;

        public MariaDbOrganizationService(MariaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.Organization.Remove(new Model.Organization { Id = id });
                return await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            { 
                return 0;
            }
        }

        public async Task<IEnumerable<Organization>> FindAll()
        {
            return await _dbContext.Organization.ToListAsync();
        }

        public async Task<Organization> FindOne(int id)
        {
            return await _dbContext.Organization.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(Organization org)
        {
            _dbContext.Add(org);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(Organization org)
        {
            try
            {
                _dbContext.Update(org);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }
    }
}
