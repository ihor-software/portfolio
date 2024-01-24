using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Attempt3.Pages
{
    public class ifAdminModel : PageModel
    {
        public IActionResult OnGet(string username, string password)
        {
            if (username=="secretuser1" && password=="qwerty")
            {
                return Page();
            }
            else
            {
                return NotFound();
            }
        }
    }
}