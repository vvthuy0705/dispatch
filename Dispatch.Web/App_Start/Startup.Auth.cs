using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using Dispatch.Data;
using Dispatch.Model;

[assembly: OwinStartup(typeof(Dispatch.Web.App_Start.Startup))]

namespace Dispatch.Web.App_Start
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            // Configure the db context, user manager and signin manager to use a single instance per request
           
            app.CreatePerOwinContext(TeduShopDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
            // sử dụng token vào cơ chế authen 
            // tạo usermanager đẻ tương tác đăng nhập
            // OwinContext để quản lý user manager
            // midleware , cở chế riêng , độc lập, đăng nhập với tất cả thàn phần  facebook, 
            app.CreatePerOwinContext<UserManager<ApplicationUser>>(CreateManager);

            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                // api tất cả thằng đăng nhập thông qua 
                TokenEndpointPath = new PathString("/oauth/token"),
                Provider = new AuthorizationServerProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                AllowInsecureHttp = true
            });
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());




            // Configure the sign in cookie
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/login.html"),
                Provider = new CookieAuthenticationProvider
                {
                    // Enables the application to validate the security stamp when the user logs in.
                    // This is a security feature which is used when you change a password or add an external login to your account.  
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, ApplicationUser>(
                        validateInterval: TimeSpan.FromMinutes(30),
                        regenerateIdentity: (manager, user) => user.GenerateUserIdentityAsync(manager))
                }
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

        }

        public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
        {
            /// <summary>
            /// Chức năng : thực hiện xác thức khi có người đăng nhập, validate token
            /// validate tất cả request gửi về server
            /// nếu chưa đăng nhập sẽ chuyển sang trang login
            /// </summary>
            /// <param name="context"> chứa thông tin đăng nhập</param>
            /// <returns>true : đã được xác thực, false: thực hiện lại đăng nhập</returns>
            public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
             {
              context.Validated();
            }
            /// <summary>
            /// Cấp chứng chỉ , hay gán token
            /// </summary>
            /// <param name="context"></param>
            /// <returns></returns>
            public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
            {
                #region cho phép dăng nhập nhieu domain khác nhau 
                var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

                if (allowedOrigin == null) allowedOrigin = "*";

                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
                #endregion
                UserManager<ApplicationUser> userManager = context.OwinContext.GetUserManager<UserManager<ApplicationUser>>();
                ApplicationUser user;
                try
                {
                    user = await userManager.FindAsync(context.UserName, context.Password);
                }
                catch
                {
                    // Could not retrieve the user due to error.
                    context.SetError("server_error");
                    context.Rejected();
                    return;
                }
                if (user != null)
                    {
                    ClaimsIdentity identity = await userManager.CreateIdentityAsync(
                                                           user,
                                                           DefaultAuthenticationTypes.ExternalBearer);
                    var identity1 = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity1.AddClaim(new Claim("sub", context.UserName));
                    identity1.AddClaim(new Claim("role", "user"));
                    context.Validated(identity);
                }
                else
                {
                    context.Rejected();
                    context.SetError("invalid_grant", "Tài khoản hoặc mật khẩu không đúng.'");
                }
            }
        }
        private static UserManager<ApplicationUser> CreateManager(IdentityFactoryOptions<UserManager<ApplicationUser>> options, IOwinContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context.Get<TeduShopDbContext>());
            var owinManager = new UserManager<ApplicationUser>(userStore);
            return owinManager;
        }
    }

}
