using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Dispatch.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Web.WebApiConfig.Register);
            FilterConfig.Web.FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.Web.RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.Web.BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}