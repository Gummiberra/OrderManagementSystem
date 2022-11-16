using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbOrderItemService
    {
        public Task<int> Delete(int id);
        public Task<IEnumerable<OrderItem>> FindAll();
        public Task<OrderItem> FindOne(int id);
        public Task<int> Insert(OrderItem item);
        public Task<int> Update(OrderItem item);
    }
}
