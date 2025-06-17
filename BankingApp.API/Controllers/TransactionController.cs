//Controllers/TransactionController.cs
using Microsoft.AspNetCore.Mvc;
using BankingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BankingApp.API.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly BankingContext _context;
        public TransactionController(BankingContext context)
        {
            _context = context;
        }
        //GET: api/transactions/user.api
        [HttpGet("user/userId")]
        public async Task<IActionResult> GetUserTransactions(int userId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .ToListAsync();

            return Ok(transactions);
        }
    }
}