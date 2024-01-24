using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WP.Models;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WP.Controllers
{
    public class ManageProductsController : Controller
    {
        private readonly wpContext _context;
        public string main_user;

        public ManageProductsController(wpContext context)
        {
            _context = context;
        }

        public IList<Product> Product { get; set; }

        public void ManageClient(string user)
        {
            main_user = user;
        }
        // GET: /<controller>/

        public async Task<IActionResult> Manage(string email)
        {
            //var product = JsonConvert.DeserializeObject<Product[]>(user);
            //foreach (var rootObject in product)
            //{
            //    Console.WriteLine(rootObject.client);
            //    Console.WriteLine("------------");
            //}
            ////var products = _context.Product.Where(p => p.client == main_user);
            ////return View(products);
            //return View(product);
            ViewBag.Mng = email;
            Product = _context.Product.ToList();
            return View(Product);
        }

        public void Middle(string user)
        {
           // ViewBag.Mng = email;

            //return RedirectToAction("Manage", "ManageProducts", new { email = client.email, role = person.role });
        }

        public RedirectToActionResult Middle2(string user)
        {
            // ViewBag.Mng = email;

            return RedirectToAction("Manage", "ManageProducts", new { email = user });
        }

        public JsonResult OnGetProducts()
        {
            Product = _context.Product.ToList();
            return new JsonResult(Product);
        }
    }
}