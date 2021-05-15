using System;
using Microsoft.EntityFrameworkCore;
using PensionHelpAPI.Models;

namespace PensionHelpAPI.Data
{
    public class PensionHelpContext : DbContext
    {
        public PensionHelpContext(DbContextOptions<PensionHelpContext> options) : base(options)
        {

        }
        public DbSet<Saving> Savings { get; set; }
        public DbSet<Spending> Spendings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Saving>().ToTable("Savings");
            modelBuilder.Entity<Spending>().ToTable("Spendings");
        }
    }
}
