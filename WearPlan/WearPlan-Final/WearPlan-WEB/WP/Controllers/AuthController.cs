using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using WP.Models;
using Microsoft.Data.Sqlite;
using System.Data.SQLite;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.IO;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WP.Controllers
{
    public class AuthController : Controller
    {
        private readonly wpContext _context;

        public AuthController(wpContext context)
        {
            _context = context;
        }

        public string name { get; set; }

        // GET: /<controller>/
        public IActionResult Register([Bind("idPerson,email,password,cpassword,role")] Person person)
        {
            if (person.password == person.cpassword)
            {
                Client client = new Client();
                Customer customer = new Customer();
                Subscriber sub = new Subscriber();
                

                if (person.role == "client")
                {
                    client.email = person.email;
                    client.password = person.password;

                    _context.Add(client);
                    _context.SaveChanges();


                    return RedirectToAction("Index", "Home");

                } else if (person.role == "customer")
                {
                    customer.email = person.email;
                    customer.password = person.password;

                    _context.Add(customer);
                    _context.SaveChanges();

                    
                    return RedirectToAction("Index", "Home");
                }
                    
                
            }
            
            return View();
        }

        public IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

    


                    public IActionResult Login([Bind("idPerson,email,password,role")] Person person)
        {
            Client client = new Client();
            Customer customer = new Customer();
            if (person.role == "client")
            {
                var configuation = GetConfiguration();
                using (SQLiteConnection con = new SQLiteConnection(configuation.GetSection("ConnectionStrings").GetSection("wpContext").Value))
                {
                    SQLiteCommand cmd = new SQLiteCommand("select * from Client where email like @username and password = @password;");
                    cmd.Parameters.AddWithValue("@username", person.email);
                    cmd.Parameters.AddWithValue("@password", person.password);
                    cmd.Connection = con;
                    con.Open();

                    DataSet ds = new DataSet();
                    SQLiteDataAdapter da = new SQLiteDataAdapter(cmd);
                    da.Fill(ds);
                    con.Close();

                    bool loginSuccessful = ((ds.Tables.Count > 0) && (ds.Tables[0].Rows.Count > 0));

                    if (loginSuccessful)
                    {
                        Console.WriteLine("Success!");
                        client.email = person.email;
                        ViewBag.Data = client.email+"(Client)";
                        
                        return RedirectToAction("Index", "Home", new { email = client.email, role = person.role });
                    }
                    else
                    {
                        Console.WriteLine("Invalid username or password");
                    }
                }
            } else if (person.role == "admin")
            {
                if (person.email == "admin@mail.com" && person.password == "1234")
                {
                    ViewBag.Admin = "Admin";
                    return RedirectToAction("Index", "Home", new { email = person.email, role = person.role });
                }
            }
            return View();

        }
    }
}
