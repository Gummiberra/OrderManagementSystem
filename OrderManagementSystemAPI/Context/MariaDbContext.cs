using Microsoft.EntityFrameworkCore;
using OrderManagementSystemAPI.Model;

namespace OrderManagementSystemAPI.Context
{
    public partial class MariaDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public MariaDbContext(DbContextOptions<MariaDbContext> options) : base(options)
        { 
        }

        public virtual DbSet<Organization> Organization { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderItem> OrderItem { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<User> User { get; set; }

    }
}
