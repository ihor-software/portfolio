﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Attempt3.Data;
using Attempt3.Models;

namespace Attempt3.Pages.DiscountPage
{
    public class IndexModel : PageModel
    {
        private readonly Attempt3.Data.MyContext2 _context;

        public IndexModel(Attempt3.Data.MyContext2 context)
        {
            _context = context;
        }

        public IList<Discount> Discount { get;set; }

        public async Task OnGetAsync()
        {
            Discount = await _context.Discount.ToListAsync();
        }
    }
}
