using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WP.Models;

namespace WP.Controllers
{
    public class ProductPurchaseController : Controller
    {
        private readonly wpContext _context;

        public ProductPurchaseController(wpContext context)
        {
            _context = context;
        }

        // GET: ProductPurchase
        public async Task<IActionResult> Index()
        {
            return View(await _context.ProductPurchase.ToListAsync());
        }

        // GET: ProductPurchase/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productPurchase = await _context.ProductPurchase
                .FirstOrDefaultAsync(m => m.idProductPurchase == id);
            if (productPurchase == null)
            {
                return NotFound();
            }

            return View(productPurchase);
        }

        // GET: ProductPurchase/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ProductPurchase/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("idProductPurchase,idProduct,idPurchase")] ProductPurchase productPurchase)
        {
            if (ModelState.IsValid)
            {
                _context.Add(productPurchase);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(productPurchase);
        }

        // GET: ProductPurchase/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productPurchase = await _context.ProductPurchase.FindAsync(id);
            if (productPurchase == null)
            {
                return NotFound();
            }
            return View(productPurchase);
        }

        // POST: ProductPurchase/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("idProductPurchase,idProduct,idPurchase")] ProductPurchase productPurchase)
        {
            if (id != productPurchase.idProductPurchase)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(productPurchase);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductPurchaseExists(productPurchase.idProductPurchase))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(productPurchase);
        }

        // GET: ProductPurchase/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productPurchase = await _context.ProductPurchase
                .FirstOrDefaultAsync(m => m.idProductPurchase == id);
            if (productPurchase == null)
            {
                return NotFound();
            }

            return View(productPurchase);
        }

        // POST: ProductPurchase/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var productPurchase = await _context.ProductPurchase.FindAsync(id);
            _context.ProductPurchase.Remove(productPurchase);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductPurchaseExists(int id)
        {
            return _context.ProductPurchase.Any(e => e.idProductPurchase == id);
        }
    }
}
