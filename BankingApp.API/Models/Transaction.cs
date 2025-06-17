//Models/Transaction.cs

namespace BankingApp.API.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } // Deposit or Withdrawal
        public DateTime Date { get; set; }
    }
}
