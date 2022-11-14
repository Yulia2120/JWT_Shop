using JWT_Shop.Models;
using Microsoft.EntityFrameworkCore;

namespace JWT_Shop.Data
{
    public class DbContextClass: DbContext
    {
        protected readonly IConfiguration Configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string str = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build().GetConnectionString("DefaultConnection");
            options.UseSqlServer(str);
        }
        public DbSet<Product> Products { get; set; }
    }
}
