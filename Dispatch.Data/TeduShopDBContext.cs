using Dispatch.Model;
using Dispatch.Model.Models;
using Dispatch.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Dispatch.Data
{
    //DbContext là một phần quan trọng của Entity Framework.Nó là một cầu nối giữa lớp domain hoặc
    //thực thể và CSDL của bạn.DbContext là lớp chính chịu trách nhiệm cho việc tương tác với dữ liệu như là đối tượng
    public class TeduShopDbContext : IdentityDbContext<ApplicationUser>
    {
        public TeduShopDbContext() : base("TeduShopConnection")
        {
            // ta load bảng cha không tự động load thêm bảng con nữa
            // Migration thực chất là để lưu vết mỗi lần sử đôi thông tin db
            this.Configuration.LazyLoadingEnabled = true;
        }

        /// <summary>
        /// Dbset thể hiện của 1 tập thực thể được sử dụng thao tác thêm , sứa xóa ,
        /// </summary>
        /// vvthuy (9/4/2019)
        public DbSet<Footer> Footers { get; set; }

        public DbSet<Error> Errors { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuGroup> MenuGroups { get; set; }

        public DbSet<SupportOnline> SupportOnlines { get; set; }
        public DbSet<SystemConfig> SystemConfigs { get; set; }
        public DbSet<VisitorStatistic> VisitorStatistics { get; set; }
        public DbSet<ContactDetail> ContactDetails { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<ApplicationGroup> ApplicationGroups { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationRoleGroup> ApplicationRoleGroups { get; set; }
        public DbSet<ApplicationUserGroup> ApplicationUserGroups { get; set; }

        /// <summary>
        /// phương thức khởi tạo chính nó
        /// </summary>
        /// <returns></returns>
        public static TeduShopDbContext Create()
        {
            return new TeduShopDbContext();
        }

        /// <summary>
        /// chạy khi mà chúng ta khởi tạo entity framework
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            builder.Entity<IdentityUserRole>().HasKey(i => new { i.UserId, i.RoleId }).ToTable("ApplicationUserRoles");
            builder.Entity<IdentityUserLogin>().HasKey(i => i.UserId).ToTable("ApplicationUserLogins");
            builder.Entity<IdentityRole>().ToTable("ApplicationRoles");
            builder.Entity<IdentityUserClaim>().HasKey(i => i.UserId).ToTable("ApplicationUserClaims");
        }
    }
}