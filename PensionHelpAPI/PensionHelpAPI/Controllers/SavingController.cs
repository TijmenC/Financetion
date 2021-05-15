using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensionHelpAPI.Data;
using PensionHelpAPI.Models;
using PensionHelpAPI.ModelsDTO;
using PensionHelpAPI.ViewModels;

namespace PensionHelpAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavingController : ControllerBase
    {
        private readonly PensionHelpContext _context;

        public SavingController(PensionHelpContext context)
        {
            _context = context;
        }

        // GET: api/Saving/5

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavingDTO>>> GetQuestions()
        {
            return await _context.Savings
                .Select(x => SavingToDTO(x))
                .ToListAsync();
        }

        // GET: api/Saving/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavingDTO>> GetQuestion(int id)
        {
            var question = await _context.Savings.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return SavingToDTO(question);
        }
        // POST: api/Saving/5
        [HttpPost]
        public async Task<ActionResult<SavingDTO>> CreateQuestion(SavingDTO savingDTO)
        {

            var saving = new Saving
            {
                Id = savingDTO.Id,
                Description = savingDTO.Description,
                MaxGoal = savingDTO.MaxGoal,
                CurrentGoal = savingDTO.CurrentGoal
            };


            _context.Savings.Add(saving);
            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(GetQuestion),
                new { id = saving.Id },
                SavingToDTO(saving));
        }

        // PUT: api/Saving/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, SavingAddMoney savingDTO)
        {
            if (id != savingDTO.Id)
            {
                return BadRequest();
            }

            var saving = await _context.Savings.FindAsync(id);
            if (saving == null)
            {
                return NotFound();
            }

            saving.Id = savingDTO.Id;
            saving.Description = savingDTO.Description;
            saving.MaxGoal = savingDTO.MaxGoal;
            saving.CurrentGoal = savingDTO.CurrentGoal + savingDTO.AddMoney;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!SavingExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }
        // DELETE: api/Saving/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SavingDTO>> DeleteQuestion(int id)
        {
            var question = await _context.Savings.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            _context.Savings.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool SavingExists(long id)
        {
            return _context.Savings.Any(e => e.Id == id);
        }
        private static SavingDTO SavingToDTO(Saving saving) =>
     new SavingDTO
     {
         Id = saving.Id,
         Description = saving.Description,
         MaxGoal = saving.MaxGoal,
         CurrentGoal = saving.CurrentGoal
     };
    }
}
