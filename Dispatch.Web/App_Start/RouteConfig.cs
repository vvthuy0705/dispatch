using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RouteConfig.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            // BotDetect requests must not be routed
            routes.IgnoreRoute("{*botdetect}", new { botdetect = @"(.*)BotDetectCaptcha\.ashx" });

            routes.MapRoute(
            name: "Login",
            url: "login.html",
            defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }
        );
            routes.MapRoute(
           name: "Register",
           url: "register.html",
           defaults: new { controller = "Account", action = "Register", id = UrlParameter.Optional },
           namespaces: new string[] { "Dispatch.Web.Controller" }
       );
            routes.MapRoute(
           name: "Account",
           url: "account.html",
           defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
           namespaces: new string[] { "Dispatch.Web.Controller" }
       );
            routes.MapRoute(
            name: "about",
            url: "about.html",
            defaults: new { controller = "About", action = "Index", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }
        );
            routes.MapRoute(
            name: "Search",
            url: "search.html",
            defaults: new { controller = "Product", action = "Search", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

         );
            routes.MapRoute(
            name: "Cart",
            url: "cart.html",
            defaults: new { controller = "ShoppingCart", action = "Index", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

         );
            routes.MapRoute(
            name: "CheckOut ",
            url: "pay.html",
            defaults: new { controller = "ShoppingCart", action = "Index", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

         );
            routes.MapRoute(
            name: "Contact",
            url: "contact.html",
            defaults: new { controller = "Contact", action = "Index", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

          );
            routes.MapRoute(
            name: "Product Category",
            url: "{alias}.pc-{id}.html",
            defaults: new { controller = "Product", action = "Category", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }
          );
            routes.MapRoute(
            name: "Products",
            url: "{alias}.p-{id}.html",
            defaults: new { controller = "Product", action = "Detail", id = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

        );  
            routes.MapRoute(
            name: "TagList",
            url: "tag/{tagId}.html",
            defaults: new { controller = "Product", action = "ListByTag", tagId = UrlParameter.Optional },
            namespaces: new string[] { "Dispatch.Web.Controller" }

        );
                routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "Dispatch.Web.Controller" }

            );
        }
    }
}
