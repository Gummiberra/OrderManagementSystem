using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;
using System.Text.Json;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : Controller
    {

        private readonly IMariaDbOrganizationService _organizationService;
        public OrganizationController(IMariaDbOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<Organization>> Get()
        {
            return await _organizationService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<Organization>> Get(int id)
        {
            var result = await _organizationService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Organization>> Insert(Organization org)
        {
            if (org.Id != null)
                return BadRequest("Id cannot be set for insert action");

            var id = await _organizationService.Insert(org);
            if (id != default)
                return Ok(await _organizationService.FindAll());
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Organization>> Update(Organization org)
        {
            if (org.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _organizationService.Update(org);
            if (result > 0)
                return Ok(await _organizationService.FindAll());
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Organization>> Delete(int id)
        {
            var result = await _organizationService.Delete(id);
            if (result > 0)
                return Ok(await _organizationService.FindAll());
            else
                return NotFound();
        }
    }
}
