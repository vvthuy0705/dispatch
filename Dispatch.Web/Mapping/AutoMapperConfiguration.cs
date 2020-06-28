using AutoMapper;
using Dispatch.Model;
using Dispatch.Web.Models;
using Autofac.Extensions.DependencyInjection;
using Dispatch.Model.Models;

namespace Dispatch.Web.Mapping
{
    public class AutoMapperConfiguration
    {
        /// <summary>
        ///
        /// </summary>
        public static MapperConfiguration Configuration()
        {
            var config = new MapperConfiguration
            (cfg =>
            {
                cfg.CreateMap<Footer, FooterViewModel>();
                cfg.CreateMap<ContactDetail,ContactDetailViewModel>();
                cfg.CreateMap<ApplicationGroup, ApplicationGroupViewModel>();
                cfg.CreateMap<ApplicationRole, ApplicationRoleViewModel>();
                cfg.CreateMap<ApplicationUser, ApplicationUserViewModel>();
            });
            return config;
        }



    }
}