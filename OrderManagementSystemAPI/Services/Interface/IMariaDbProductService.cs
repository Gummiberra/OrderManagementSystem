using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbProductService
    {
        public Task<int> Delete(int id);
        public Task<IEnumerable<Product>> FindAll();
        public Task<Product> FindOne(int id);
        public Task<int> Insert(Product prod);
        public Task<int> Update(Product prod);
    }
}
