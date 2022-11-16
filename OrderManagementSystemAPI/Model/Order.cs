namespace OrderManagementSystemAPI.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderNr { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime Date { get; set; }
        public int CustomerId { get; set; }
        public int OrganizationId { get; set; }
        public OrderItem[]? Items { get; set; }

    }
}
