using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.WardrobePage
{
    public class DeleteModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public DeleteModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public Wardrobe Wardrobe { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Wardrobe = await _context.Wardrobe.FirstOrDefaultAsync(m => m.idWardrobe == id);

            if (Wardrobe == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Wardrobe = await _context.Wardrobe.FindAsync(id);

            if (Wardrobe != null)
            {
                _context.Wardrobe.Remove(Wardrobe);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
