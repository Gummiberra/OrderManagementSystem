using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbCustomerService
    {
        public Task<int> Delete(int id);
        public Task<IEnumerable<Customer>> FindAll();
        public Task<Customer> FindOne(int id);
        public Task<int> Insert(Customer cus);
        public Task<int> Update(Customer cus);
    }
}
