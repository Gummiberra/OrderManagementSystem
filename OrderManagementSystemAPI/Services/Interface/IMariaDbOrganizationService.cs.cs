using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbOrganizationService
    {

        public Task<int> Delete(int id);
        public Task<IEnumerable<Organization>> FindAll();
        public Task<Organization> FindOne(int id);
        public Task<int> Insert(Organization org);
        public Task<int> Update(Organization org);

    }
}
