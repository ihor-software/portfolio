using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WP.Models;

namespace WP.Controllers
{
    public class SubscriberController : Controller
    {
        private readonly wpContext _context;

        public SubscriberController(wpContext context)
        {
            _context = context;
        }

        // GET: Subscriber
        public async Task<IActionResult> Index()
        {
            return View(await _context.Subscriber.ToListAsync());
        }

        // GET: Subscriber/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subscriber = await _context.Subscriber
                .FirstOrDefaultAsync(m => m.idSubscriber == id);
            if (subscriber == null)
            {
                return NotFound();
            }

            return View(subscriber);
        }

        // GET: Subscriber/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Subscriber/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("idSubscriber,idClient,status")] Subscriber subscriber)
        {
            if (ModelState.IsValid)
            {
                _context.Add(subscriber);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(subscriber);
        }

        public async Task<RedirectToActionResult> AddToSubscription(int idClient)
        {
            Subscriber sub = new Subscriber();
            sub.idClient = idClient;
            sub.status = "deactivated";

            _context.Add(sub);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));


        }

        public async Task<RedirectToActionResult> Activate(int idClient)
        {
            _context.Database.ExecuteSqlRaw("update Subscriber set status='activated' where idClient = 1");
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<RedirectToActionResult> Deactivate(int idClient)
        {
            _context.Database.ExecuteSqlRaw("update Subscriber set status='deactivated' where idClient = 1");
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Subscriber/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subscriber = await _context.Subscriber.FindAsync(id);
            if (subscriber == null)
            {
                return NotFound();
            }
            return View(subscriber);
        }

        // POST: Subscriber/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("idSubscriber,idClient,status")] Subscriber subscriber)
        {
            if (id != subscriber.idSubscriber)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(subscriber);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SubscriberExists(subscriber.idSubscriber))
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
            return View(subscriber);
        }

        // GET: Subscriber/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subscriber = await _context.Subscriber
                .FirstOrDefaultAsync(m => m.idSubscriber == id);
            if (subscriber == null)
            {
                return NotFound();
            }

            return View(subscriber);
        }

        // POST: Subscriber/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var subscriber = await _context.Subscriber.FindAsync(id);
            _context.Subscriber.Remove(subscriber);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SubscriberExists(int id)
        {
            return _context.Subscriber.Any(e => e.idSubscriber == id);
        }
    }
}
