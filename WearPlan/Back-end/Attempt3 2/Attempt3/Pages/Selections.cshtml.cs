using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Attempt3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Attempt3.Pages
{
    public class SelectionsModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        private readonly Attempt3.Data.MyContext2 _context;

        public SelectionsModel(Attempt3.Data.MyContext2 context, ILogger<IndexModel> logger)
        {
            _context = context;
            _logger = logger;
        }
        public IList<ProductPurchase> comps { get; set; }
        public IList<string> listarray { get; set; }
        public int[] q { get; set; }

        [BindProperty]
        public IList<Product> Product { get; set; }
        public async Task OnGet()
        {
            using (_context)
            {
                 comps = _context.ProductPurchase.FromSqlRaw("SELECT idProductPurchase,TOP3.idProduct,idPurchase FROM TOP3,ProductPurchase WHERE TOP3.idProduct = ProductPurchase.idProduct ORDER BY Count DESC").ToList();
                //PP = await _context.ProductPurchase.ToListAsync();
                // return Page(Selections, comps);
                int[] arr = new int[comps.Count];
                for(int i=0;i<comps.Count;i++)
                {
                    arr[i] = comps[i].idProduct;
                }
                
                q = arr.Distinct().ToArray();
               
                
               
                comps =  _context.ProductPurchase.ToList();
                Console.WriteLine("-----------");

               
                Product =  _context.Product.ToList();

            }
        }
    }
}