using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WP.Models;

    public class wpContext : DbContext
    {
        public wpContext (DbContextOptions<wpContext> options)
            : base(options)
        {
        }

        public DbSet<WP.Models.Client> Client { get; set; }

        public DbSet<WP.Models.Customer> Customer { get; set; }

        public DbSet<WP.Models.Product> Product { get; set; }

        public DbSet<WP.Models.ProductPurchase> ProductPurchase { get; set; }

        public DbSet<WP.Models.Purchase> Purchase { get; set; }

        public DbSet<WP.Models.Selection> Selection { get; set; }

        public DbSet<WP.Models.Subscriber> Subscriber { get; set; }
    }
