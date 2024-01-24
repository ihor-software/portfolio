using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.PCPage
{
    public class CreateModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public CreateModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public ProductCategory ProductCategory { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.ProductCategory.Add(ProductCategory);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
