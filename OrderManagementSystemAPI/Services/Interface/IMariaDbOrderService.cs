using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbOrderService
    {
        public Task<int> Delete(int id);
        public Task<IEnumerable<Order>> FindAll();
        public Task<Order> FindOne(int id);
        public Task<int> Insert(Order order);
        public Task<int> Update(Order order);
    }
}
