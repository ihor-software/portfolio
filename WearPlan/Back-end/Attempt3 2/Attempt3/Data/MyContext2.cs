using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Data
{
    public class MyContext2:DbContext
    {
        public MyContext2(DbContextOptions<MyContext2> options)
           : base(options)
        {

        }
        public DbSet<Attempt3.Models.Product> Product { get; set; }
        public DbSet<Attempt3.Models.Brand> Brand { get; set; }
        public DbSet<Attempt3.Models.Category> Category { get; set; }
        public DbSet<Attempt3.Models.Client> Client { get; set; }
        public DbSet<Attempt3.Models.Customer> Customer { get; set; }
        public DbSet<Attempt3.Models.Discount> Discount { get; set; }
        public DbSet<Attempt3.Models.ProductBrand> ProductBrand { get; set; }
        public DbSet<Attempt3.Models.ProductCategory> ProductCategory { get; set; }
        public DbSet<Attempt3.Models.ProductPurchase> ProductPurchase { get; set; }
        public DbSet<Attempt3.Models.ProductSize> ProductSize { get; set; }
        public DbSet<Attempt3.Models.Purchase> Purchase { get; set; }
        public DbSet<Attempt3.Models.Selection> Selection { get; set; }
        public DbSet<Attempt3.Models.Size> Size { get; set; }
        public DbSet<Attempt3.Models.Subscriber> Subscriber { get; set; }
        public DbSet<Attempt3.Models.Wardrobe> Wardrobe { get; set; }
    }
}
