using HitToMeet.DAL.Entities;
using HitToMeet.DAL.Entities.Quiz;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HitToMeet.DAL
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> DbUsers { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Chat> Chats { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // использование Fluent API
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(u => u.AcceptedChats)
                .WithOne(c => c.Accepter)
                .HasForeignKey(c => c.AccepterId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>()
                .HasMany(u => u.InitiatedChats)
                .WithOne(c => c.Initiator)
                .HasForeignKey(c => c.InitiatorId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserSkins)
                .WithOne(us => us.User)
                .HasForeignKey(us => us.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Skin>()
                .HasMany(s => s.UserSkins)
                .WithOne(us => us.Skin)
                .HasForeignKey(us => us.SkinId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(s => s.AcceptedRates)
                .WithOne(ar => ar.Accepter)
                .HasForeignKey(ar => ar.AccepterId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>()
                .HasMany(s => s.SendedRates)
                .WithOne(ar => ar.Sender)
                .HasForeignKey(ar => ar.SenderId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Chat)
                .HasForeignKey(m => m.ChatId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(u => u.SendedMessages)
                .WithOne(m => m.Sender)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Animal>()
                .HasMany(a => a.Skins)
                .WithOne(s => s.Animal)
                .HasForeignKey(s => s.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Animal>()
                .HasMany(a => a.Users)
                .WithOne(s => s.Animal)
                .HasForeignKey(s => s.AnimalId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<UserSkin>()
                .HasKey(us => new { us.SkinId, us.UserId });
            modelBuilder.Entity<Rate>()
                .HasKey(us => new { us.SenderId, us.AccepterId });
            modelBuilder.Entity<Chat>()
                .HasIndex(us => new { us.InitiatorId, us.AccepterId });
        }
    }
}
