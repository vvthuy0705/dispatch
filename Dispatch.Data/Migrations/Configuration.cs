namespace Dispatch.Data.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Diagnostics;
    using System.Linq;
    using Dispatch.Common;
    using Dispatch.Model;

    internal sealed class Configuration : DbMigrationsConfiguration<Dispatch.Data.TeduShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Dispatch.Data.TeduShopDbContext context)
        {
            //This method will be called after migrating to the latest version.

            CreateContactDetail(context);
            //    var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new TeduShopDbContext()));

            //    var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new TeduShopDbContext()));

            //    var user = new ApplicationUser()
            //    {
            //        UserName = "npthao",
            //        Email = "tedu.international@gmail.com",
            //        EmailConfirmed = true,
            //        BirthDay = DateTime.Now,
            //        FullName = "Vu Van Thuy"
            //    };

            //    manager.Create(user, "123654$");

            //    if (!roleManager.Roles.Any())
            //    {
            //        roleManager.Create(new IdentityRole { Name = "Admin" });
            //        roleManager.Create(new IdentityRole { Name = "User" });
            //    }

            //    var adminUser = manager.FindByName("tedu");

            //    manager.AddToRoles(adminUser.Id, new string[] { "Admin", "User" });
        }

        // site mới
       
        //private void CreatFooterSample(TeduShopDbContext context)
        //{
        //    if (context.Footers.Count(x => x.ID == CommonConstants.DefaultFooterId) == 0)
        //    {
        //        string content = "";
        //    }
        //}
    

        private void CreateContactDetail(TeduShopDbContext context)
        {
            if (context.ContactDetails.Count() == 0)
            {
                try
                {
                    var contactDetail = new Dispatch.Model.ContactDetail()
                    {
                        Name = "Shop thời trang TEDU",
                        Address = "Ngõ 195 Trần Cung",
                        Email = "vvthuy@gmail.com",
                        Lat = 21.0633645,
                        Lng = 105.8053274,
                        Phone = "095423233",
                        Website = "http://tedu.com.vn",
                        Other = "",
                        Status = true

                    };
                    context.ContactDetails.Add(contactDetail);
                    context.SaveChanges();
                }
                catch (DbEntityValidationException ex)
                {
                    foreach (var eve in ex.EntityValidationErrors)
                    {
                        Trace.WriteLine($"Entity of type \"{eve.Entry.Entity.GetType().Name}\" in state \"{eve.Entry.State}\" has the following validation error.");
                        foreach (var ve in eve.ValidationErrors)
                        {
                            Trace.WriteLine($"- Property: \"{ve.PropertyName}\", Error: \"{ve.ErrorMessage}\"");
                        }
                    }
                }

            }
        }
    }
}