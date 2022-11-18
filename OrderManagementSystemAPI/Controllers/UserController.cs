using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OrderManagementSystemAPI.Helpers;
using OrderManagementSystemAPI.Model;
using OrderManagementSystemAPI.Service.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
                return NotFound(new { Message = "Username and/or password is invalid!"});

            if (!PasswordHasher.VerifyPassword(userObject.Password, user.Password))
                return Unauthorized(new { Message = "Username and/or password is invalid!" });

            var token = CreateJwtToken(user);

            return Ok(new { 
                Token = new JwtSecurityTokenHandler().WriteToken(token),
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

            if (await _userService.FindOneByEmail(userObject.Email) != default)
                return Conflict(new { Message = "Email already exists" });

            var pass = CheckPasswordStrength(userObject.Password);
            if(!string.IsNullOrEmpty(pass))
                return UnprocessableEntity(new { Message = pass.ToString() });

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
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 12)
                sb.Append("Minimum password length should be 12" + Environment.NewLine);
            if (!Regex.IsMatch(password, "^(?=.*[A-Z].*[A-Z])"))
                sb.Append("Password should contain 2 uppercase letters" + Environment.NewLine);
            if (!Regex.IsMatch(password, "^(?=.*[!@#$&*])"))
                sb.Append("Password should contain 1 specialcharacters" + Environment.NewLine);
            if (!Regex.IsMatch(password, "^(?=.*[0-9].*[0-9])"))
                sb.Append("Password should contain 2 numbers" + Environment.NewLine);
            if (!Regex.IsMatch(password, "^(?=.*[a-z].*[a-z].*[a-z])"))
                sb.Append("Password should contain 2 numbers" + Environment.NewLine);
            return sb.ToString();
        }

        private JwtSecurityToken CreateJwtToken(User user)
        {
            var identity = new List<Claim> {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("testKeyforThewin"));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(1),
                claims: identity,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

    }
}
