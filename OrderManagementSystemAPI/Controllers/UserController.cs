using Microsoft.AspNetCore.Mvc;
using OrderManagementSystemAPI.Helpers;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;
using System.Text;
using System.Text.RegularExpressions;

namespace OrderManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IMariaDbUserService _userService;
        public UserController(IMariaDbUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObject) {
            if (userObject == null)
                return BadRequest();

            var user = await _userService.FindOneByUsername(userObject.Username);
            if(user == null)
                return NotFound(new { Message = "User not found!"});

            var authenticatedUser = await _userService.Authenticate(userObject);

            if (authenticatedUser == null)
                return Unauthorized(new { Message = "Password is invalid!"});

            return Ok(new { 
                Message = "Login Success!"
            });

        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Insert([FromBody] User userObject)
        {
            if (userObject == null)
                return BadRequest();

            if (await _userService.FindOneByUsername(userObject.Username) != default)
                return Conflict(new { Message = "Username already exists" });

            if(await _userService.FindOneByEmail(userObject.Email) != default)
                return Conflict(new { Message = "Email already exists" });

            if(!CheckPasswordStrength(userObject.Password))
                return UnprocessableEntity(new { Message = "Password did not meet requirements"});

            userObject.Password = PasswordHasher.HashPassword(userObject.Password);

            var id = await _userService.Insert(userObject);
            if(id != default)
                return Ok(await _userService.FindAll());
            else
                return BadRequest();

        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _userService.FindAll();
        }

        [HttpGet("{id}", Name = "[controller]/FindOne")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var result = await _userService.FindOne(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPut]
        public async Task<ActionResult<User>> Update(User user)
        {
            if (user.Id == null)
                return BadRequest("Id should be set for update action");

            var result = await _userService.Update(user);
            if (result > 0)
                return Ok(await _userService.FindAll());
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var result = await _userService.Delete(id);
            if (result > 0)
                return Ok(await _userService.FindAll());
            else
                return NotFound();
        }

        /*
         * 12 characters length
         * 2 letters in Upper Case
         * 1 Special Character (!@#$&*)
         * 2 numerals (0-9)
         * 3 letters in Lower Case
         */
        private bool CheckPasswordStrength(string password)
        {
            if (Regex.IsMatch(password, "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{12}$"))
                return true;
            return false;
        }


    }
}
