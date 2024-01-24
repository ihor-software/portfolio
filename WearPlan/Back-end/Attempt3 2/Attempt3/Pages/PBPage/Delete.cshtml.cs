using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.PBPage
{
    public class DeleteModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public DeleteModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public ProductBrand ProductBrand { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ProductBrand = await _context.ProductBrand.FirstOrDefaultAsync(m => m.idProductBrand == id);

            if (ProductBrand == null)
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

            ProductBrand = await _context.ProductBrand.FindAsync(id);

            if (ProductBrand != null)
            {
                _context.ProductBrand.Remove(ProductBrand);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
