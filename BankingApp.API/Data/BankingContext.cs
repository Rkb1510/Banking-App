//Data/BankinContext.cs

using Microsoft.EntityFrameworkCore;
using BankingApp.API.Models;

namespace BankingApp.API.Data
{
    public class BankingContext : DbContext
    {
        public BankingContext(DbContextOptions<BankingContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
