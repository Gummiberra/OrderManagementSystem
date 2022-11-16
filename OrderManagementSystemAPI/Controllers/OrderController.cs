using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IMariaDbOrderService _orderService;

        public OrderController(IMariaDbOrderService  orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> Get()
        {
            return await _orderService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            var result = await _orderService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Insert(Order order)
        {
            if (order.Id != null)
                return BadRequest("Id cannot be set for insert action");
            var id = await _orderService.Insert(order);
            if (id != default)
                return CreatedAtRoute("[controller]/FindOne", new { id = id }, order);
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Order>> Update(Order order)
        {
            if (order.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _orderService.Update(order);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> Delete(int id)
        {
            var result = await _orderService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}
