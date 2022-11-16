using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IMariaDbProductService _ProductService;

        public ProductController(IMariaDbProductService ProductService)
        {
            _ProductService = ProductService;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _ProductService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var result = await _ProductService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Insert(Product prod)
        {
            if (prod.Id != null)
                return BadRequest("Id cannot be set for insert action");
            var id = await _ProductService.Insert(prod);
            if (id != default)
                return CreatedAtRoute("[controller]/FindOne", new { id = id }, prod);
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Product>> Update(Product prod)
        {
            if (prod.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _ProductService.Update(prod);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            var result = await _ProductService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}
