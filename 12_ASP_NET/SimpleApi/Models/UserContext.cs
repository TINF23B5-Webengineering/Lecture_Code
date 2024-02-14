using Microsoft.EntityFrameworkCore;

namespace SimpleApi.Models;

public class UserContext(DbContextOptions<UserContext> options) : DbContext(options)
{
  public DbSet<User> Users { get; set; }
}
