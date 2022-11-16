using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Service.Interface
{
    public interface IMariaDbUserService
    {
        public Task<int> Delete(int id);
        public Task<IEnumerable<User>> FindAll();
        public Task<User> FindOne(int id);
        public Task<User> FindOneByUsername(string username);
        public Task<User> Authenticate(User user);
        public Task<int> Insert(User user);
        public Task<int> Update(User user);
    }
}
