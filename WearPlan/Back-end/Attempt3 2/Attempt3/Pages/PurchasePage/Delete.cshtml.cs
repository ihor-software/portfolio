using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.PurchasePage
{
    public class DeleteModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public DeleteModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public Purchase Purchase { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Purchase = await _context.Purchase.FirstOrDefaultAsync(m => m.idPurchase == id);

            if (Purchase == null)
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

            Purchase = await _context.Purchase.FindAsync(id);

            if (Purchase != null)
            {
                _context.Purchase.Remove(Purchase);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
