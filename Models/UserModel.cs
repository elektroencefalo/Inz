namespace MirekInzFinal.Models
{
    public class UserModel
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public List<ReservationModel> Reservation { get; set; }


        public UserModel(string username, string email, string password, string role)
        {
            Username = username;
            Email = email;
            Password = password;
            Role = role;
        }

        public UserModel()
        {

        }
    }
}