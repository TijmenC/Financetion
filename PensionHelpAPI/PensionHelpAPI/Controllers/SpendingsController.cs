using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensionHelpAPI.Data;
using PensionHelpAPI.Models;
using PensionHelpAPI.ModelsDTO;

namespace PensionHelpAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpendingsController : ControllerBase
    {
        private readonly PensionHelpContext _context;

        public SpendingsController(PensionHelpContext context)
        {
            _context = context;
        }

        // GET: api/Spendings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpendingDTO>>> GetSpendings()
        {
            return await _context.Spendings
                .Select(x => SpendingToDTO(x))
                .ToListAsync();
        }

        // GET: api/Spendings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SpendingDTO>> GetSpending(int id)
        {
            var spending = await _context.Spendings.FindAsync(id);

            if (spending == null)
            {
                return NotFound();
            }

            return SpendingToDTO(spending);
        }

        // POST: api/Spendings
        [HttpPost]
        public async Task<ActionResult<SpendingDTO>> CreateSpending(SpendingDTO spendingDTO)
        {
            var spending = new Spending
            {
                Id = spendingDTO.Id,
                Description = spendingDTO.Description,
                Price = spendingDTO.Price,
                Rating = spendingDTO.Rating
            };

            _context.Spendings.Add(spending);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSpending),
                new { id = spending.Id },
                SpendingToDTO(spending));
        }

        // PUT: api/Spendings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSpending(int id, SpendingDTO spendingDTO)
        {
            if (id != spendingDTO.Id)
            {
                return BadRequest();
            }

            var spending = await _context.Spendings.FindAsync(id);
            if (spending == null)
            {
                return NotFound();
            }

            spending.Id = spendingDTO.Id;
            spending.Description = spendingDTO.Description;
            spending.Price = spendingDTO.Price;
            spending.Rating = spendingDTO.Rating;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!SpendingExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/Spendings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SpendingDTO>> DeleteSpending(int id)
        {
            var spending = await _context.Spendings.FindAsync(id);

            if (spending == null)
            {
                return NotFound();
            }

            _context.Spendings.Remove(spending);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpendingExists(long id)
        {
            return _context.Spendings.Any(s => s.Id == id);
        }

        private static SpendingDTO SpendingToDTO(Spending spending) =>
            new SpendingDTO
            {
                Id = spending.Id,
                Description = spending.Description,
                Price = spending.Price,
                Rating = spending.Rating,
            };
    }
}
