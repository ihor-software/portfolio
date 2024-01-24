using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.SubscriberPage
{
    public class DeleteModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public DeleteModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        [BindProperty]
        public Subscriber Subscriber { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Subscriber = await _context.Subscriber.FirstOrDefaultAsync(m => m.idSubscriber == id);

            if (Subscriber == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Subscriber = await _context.Subscriber.FindAsync(id);

            if (Subscriber != null)
            {
                _context.Subscriber.Remove(Subscriber);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
