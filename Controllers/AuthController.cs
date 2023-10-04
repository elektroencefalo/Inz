
using Microsoft.AspNetCore.Mvc;
using MirekInzFinal.Models;
using MirekInzFinal.Services;


namespace MirekInzFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {


        [HttpPost("login")]
        public IActionResult Post(LoginModel loginData)
        {
            UserDatabase users = JsonTool.DeserializeUserDatabase();

            var user = users.Users.FirstOrDefault(user => user.Username == loginData.Username && user.Password == loginData.Password);
            if (user != null)
            {
                return new OkObjectResult(new UserInfoModel(user.Username, user.Email, user.Role));
            }

            return new OkObjectResult(false);

        }

        [HttpPost("register")]
        public IActionResult Post(RegisterModel userData)
        {
            UserDatabase users = JsonTool.DeserializeUserDatabase();

            if (users.Users.Any(user => user.Email == userData.Email))
            {
                return new OkObjectResult(false);
            }
            users.Users.Add(new UserModel(userData.Username, userData.Email, userData.Password, "User"));
            JsonTool.SerializeUserDatabase(users);

            return new OkObjectResult(new UserInfoModel(userData.Username, userData.Email, "User"));
        }
    }
}