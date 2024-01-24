using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WP.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WP.Controllers
{
    public class SelectionsController : Controller
    {

        private readonly wpContext _context;

        public SelectionsController(wpContext context)
        {
            _context = context;
        }
        public IList<ProductPurchase> comps { get; set; }
        public IList<string> listarray { get; set; }
        public int[] q { get; set; }

        [BindProperty]
        public IList<Product> Product { get; set; }
        // GET: /<controller>/
      
        public async Task<ViewResult> Selection()
        {
            using (_context)
            {
                comps = _context.ProductPurchase.FromSqlRaw("SELECT idProductPurchase,TOP3.idProduct,idPurchase FROM TOP3,ProductPurchase WHERE TOP3.idProduct = ProductPurchase.idProduct ORDER BY Count DESC").ToList();
                //PP = await _context.ProductPurchase.ToListAsync();
                // return Page(Selections, comps);
                int[] arr = new int[comps.Count];
                for (int i = 0; i < comps.Count; i++)
                {
                    arr[i] = comps[i].idProduct;
                }

                q = arr.Distinct().ToArray();

                ViewBag.Q = q;

                comps = _context.ProductPurchase.ToList();
                Console.WriteLine("-----------");


                Product = _context.Product.ToList();

            }
            return View(Product);
        }
    }
}
