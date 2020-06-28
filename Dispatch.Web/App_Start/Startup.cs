using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Owin;
using Microsoft.Owin.Security.DataProtection;
using Owin;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Dispatch.Data;
using Dispatch.Data.Infrastructure;
using Dispatch.Data.Repositories;
using Dispatch.Model;
using Dispatch.Service;

[assembly: OwinStartup(typeof(Dispatch.Web.App_Start.Startup))]

namespace Dispatch.Web.App_Start
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //HttpConfiguration config = new HttpConfiguration();
            //WebApiConfig.Register(config);
            //app.UseWebApi(config);
            //// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            ConfigAutofac(app);
            ConfigureAuth(app);
        }

        /// <summary>
        /// Phương thưc cấu hình autofac
        /// </summary>
        /// <param name="app"></param>
        private void ConfigAutofac(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly()); //Register WebApi Controllers

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerRequest();
            builder.RegisterType<DbFactory>().As<IDbFactory>().InstancePerRequest();

            builder.RegisterType<TeduShopDbContext>().AsSelf().InstancePerRequest(); // TeduShopDbContext

            //Asp.net Identity
            builder.RegisterType<ApplicationUserStore>().As<IUserStore<ApplicationUser>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            builder.Register(c => app.GetDataProtectionProvider()).InstancePerRequest();

            // Repositories
            builder.RegisterAssemblyTypes(typeof(FeedbackRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces().InstancePerRequest();

            // Services
            builder.RegisterAssemblyTypes(typeof(FeedbackService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();
            // gán vào container của autfac
            Autofac.IContainer container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver((IContainer)container); //Set the WebApi DependencyResolver
        }
    }
}
