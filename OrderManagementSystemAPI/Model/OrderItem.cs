namespace OrderManagementSystemAPI.Model
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
        public Product? product { get; set; }
        private int _customerId { get; set; }
    }
}
