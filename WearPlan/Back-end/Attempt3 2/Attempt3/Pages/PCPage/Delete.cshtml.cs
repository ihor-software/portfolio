using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.PCPage
{
    public class DeleteModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public DeleteModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public ProductCategory ProductCategory { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ProductCategory = await _context.ProductCategory.FirstOrDefaultAsync(m => m.idProductCategory == id);

            if (ProductCategory == null)
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

            ProductCategory = await _context.ProductCategory.FindAsync(id);

            if (ProductCategory != null)
            {
                _context.ProductCategory.Remove(ProductCategory);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
