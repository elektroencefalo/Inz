namespace MirekInzFinal.Models
{
    public class UserInfoModel
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public UserInfoModel(string username, string email, string role)
        {
            Username = username;
            Email = email;
            Role = role;
        }
    }
}