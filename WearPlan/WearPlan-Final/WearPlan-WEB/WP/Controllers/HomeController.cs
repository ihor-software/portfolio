using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WP.Models;

namespace WP.Controllers
{
    public class HomeController : Controller
    {
        private readonly wpContext _context;
        public IList<Product> Product { get; set; }

        public async Task OnGetAsync()
        {
            Product = await _context.Product.ToListAsync();
        }
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, wpContext context)
        {
            _logger = logger;
            _context = context;
        }

        public string email1 { get; set; }
        public IActionResult Index(string email, string role)
        {
            ViewBag.Email = email;
            ViewBag.Role = role;
            return View();
        }

        public async Task<ViewResult> Privacy()
        {
            Product = await _context.Product.ToListAsync();
            return View(Product);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
