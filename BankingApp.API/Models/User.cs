//Models/User.cs
namespace BankingApp.API.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal AccountBalance { get; set; }

    }
}