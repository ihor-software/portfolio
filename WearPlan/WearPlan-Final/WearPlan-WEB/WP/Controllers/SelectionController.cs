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
    public class SelectionController : Controller
    {
        private readonly wpContext _context;

        public SelectionController(wpContext context)
        {
            _context = context;
        }

        // GET: Selection
        public async Task<IActionResult> Index()
        {
            return View(await _context.Selection.ToListAsync());
        }

        // GET: Selection/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var selection = await _context.Selection
                .FirstOrDefaultAsync(m => m.idSelection == id);
            if (selection == null)
            {
                return NotFound();
            }

            return View(selection);
        }

        // GET: Selection/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Selection/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("idSelection,idProduct,idDiscount")] Selection selection)
        {
            if (ModelState.IsValid)
            {
                _context.Add(selection);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(selection);
        }

        // GET: Selection/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var selection = await _context.Selection.FindAsync(id);
            if (selection == null)
            {
                return NotFound();
            }
            return View(selection);
        }

        // POST: Selection/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("idSelection,idProduct,idDiscount")] Selection selection)
        {
            if (id != selection.idSelection)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(selection);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SelectionExists(selection.idSelection))
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
            return View(selection);
        }

        // GET: Selection/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var selection = await _context.Selection
                .FirstOrDefaultAsync(m => m.idSelection == id);
            if (selection == null)
            {
                return NotFound();
            }

            return View(selection);
        }

        // POST: Selection/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var selection = await _context.Selection.FindAsync(id);
            _context.Selection.Remove(selection);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SelectionExists(int id)
        {
            return _context.Selection.Any(e => e.idSelection == id);
        }
    }
}
