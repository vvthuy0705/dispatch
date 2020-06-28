using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using System.Web.Http;

namespace WebApiConfig.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            /// tránh việc trả vể dữ liệu định dạng sai kiểu JSON
            config.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings();
            // Web API configuration and services
            // Web API routes
            config.MapHttpAttributeRoutes();
            // cho phep api cos thể chạy với cấu hình mặc định
            // bên mvc thì không được cài đặt cới cái fhinh mặc định
            // cài đạt plugin
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}