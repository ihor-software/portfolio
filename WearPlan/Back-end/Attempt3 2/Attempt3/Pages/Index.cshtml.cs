using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Attempt3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Models;
using Attempt3.Data;

namespace Attempt3.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly MyContext2 _context;

        
        public IndexModel(ILogger<IndexModel> logger, MyContext2 context)
        {
            _logger = logger;
            _context = context;
        }
        public IList<Product> Product { get; set; }

        public async Task OnGetAsync()
        {
            Product = await _context.Product.ToListAsync();
        }
    }
}
