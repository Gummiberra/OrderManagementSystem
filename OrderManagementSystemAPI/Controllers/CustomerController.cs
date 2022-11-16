using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly IMariaDbCustomerService _customerService;

        public CustomerController(IMariaDbCustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            return await _customerService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<Customer>> Get(int id)
        {
            var result = await _customerService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> Insert(Customer cus)
        {
            if (cus.Id != null)
                return BadRequest("Id cannot be set for insert action");
            var id = await _customerService.Insert(cus);
            if (id != default)
                return Ok(await _customerService.FindAll());
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Customer>> Update(Customer cus)
        {
            if (cus.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _customerService.Update(cus);
            if (result > 0)
                return Ok(await _customerService.FindAll());
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> Delete(int id)
        {
            var result = await _customerService.Delete(id);
            if (result > 0)
                return Ok(await _customerService.FindAll());
            else
                return NotFound();
        }


    }
}
