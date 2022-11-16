using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : Controller
    {
        private readonly IMariaDbOrderItemService _orderItemService;

        public OrderItemController(IMariaDbOrderItemService orderItemService)
        {
            _orderItemService = orderItemService;
        }

        [HttpGet]
        public async Task<IEnumerable<OrderItem>> Get()
        {
            return await _orderItemService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<OrderItem>> Get(int id)
        {
            var result = await _orderItemService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<OrderItem>> Insert(OrderItem item)
        {
            if (item.Id != null)
                return BadRequest("Id cannot be set for insert action");
            var id = await _orderItemService.Insert(item);
            if (id != default)
                return CreatedAtRoute("[controller]/FindOne", new { id = id }, item);
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<OrderItem>> Update(OrderItem item)
        {
            if (item.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _orderItemService.Update(item);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderItem>> Delete(int id)
        {
            var result = await _orderItemService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}
