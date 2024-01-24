using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.PPPage
{
    public class EditModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public EditModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public ProductPurchase ProductPurchase { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ProductPurchase = await _context.ProductPurchase.FirstOrDefaultAsync(m => m.idProductPurchase == id);

            if (ProductPurchase == null)
            {
                return NotFound();
            }
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(ProductPurchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductPurchaseExists(ProductPurchase.idProductPurchase))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool ProductPurchaseExists(int id)
        {
            return _context.ProductPurchase.Any(e => e.idProductPurchase == id);
        }
    }
}
