using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Attempt3.Data;
using Attempt3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Attempt3.Pages
{
    public class ManageProductsModel : PageModel
    {
        private readonly MyContext2 _context;

        public ManageProductsModel(MyContext2 context)
        {
            _context = context;
        }

        public IList<Product> Product { get; set; }
        public async Task OnGetAsync()
        {
            Product = await _context.Product.ToListAsync();
        }
    }
}
