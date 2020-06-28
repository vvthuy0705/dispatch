using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Dispatch.Data;
using Dispatch.Model;
using Dispatch.Web.App_Start;
using Dispatch.Web.Models;
using BotDetect.Web.Mvc;
using Dispatch.Common;
using Microsoft.Owin.Security;
using System.Security.Claims;

namespace Dispatch.Web.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public AccountController()
        {

        }
        // GET: Account
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginViewModel"></param>
        /// <param name="returnUrl">lưu lại url khi mà customer vào phần thanh toán thì yêu cầu đăng  nhập, sau đó đăng nhập xong thì url tiếp tục thanh toán </param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {

            if (ModelState.IsValid)
            {
                ApplicationUser user = await UserManager.FindAsync(model.UserName, model.Password);
                if(user != null)
                {
                    IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
                    authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    // chưa thông tin đăng nhập lưu vào cookie
                    ClaimsIdentity identity = _userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationProperties authenticationProperties = new AuthenticationProperties();
                    authenticationProperties.IsPersistent = model.RememberMe;
                    authenticationManager.SignIn(authenticationProperties, identity);

                    if(Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home"); ;
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Name login and password not false!");
                }
                ViewBag.ReturnUrl = returnUrl;
            }
            
            return View();
        }
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        /// <summary>
        /// phương thức đặt chế độ chạy bất đồng bộ
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        /// 
        [HttpPost]
        [CaptchaValidation("CaptchaCode", "registerCaptcha", "Code not failed!")]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var mailUser = await _userManager.FindByEmailAsync(model.Email);

                if (mailUser != null)
                {
                    ModelState.AddModelError("Email", "Email Existed !");
                    return View(model);
                }
                var nameUser = await _userManager.FindByNameAsync(model.UserName);

                if (nameUser != null)
                {
                    ModelState.AddModelError("User", "User Existed !");
                    return View(model);
                }
                var user = new ApplicationUser()
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    EmailConfirmed = true,
                    BirthDay = DateTime.Now,
                    FullName = model.FullName,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address
                };

                await _userManager.CreateAsync(user, model.Pasword);

                var createdUser = await _userManager.FindByEmailAsync(model.Email);
                if (createdUser != null)
                {
                    // role cho user đăng ký
                    await _userManager.AddToRolesAsync(createdUser.Id, new string[] { "User" });
                    // gửi mail xác nhận tới user
                    string content = System.IO.File.ReadAllText(Server.MapPath("/Assets/client/template/new_user.html"));
                    content = content.Replace("{{UserName}}", createdUser.FullName);
                    content = content.Replace("{{Link}}", ConfigHelper.GetByKey("CurrentLink") +"login.html");
                    MailHelper.SendMail(createdUser.Email, "Infomation from website", content);

                    // TempData: redirect ko mất giá trị, ViewData: redirect mất giá trị
                    ViewData["SucessMsg"] = "Register Success!";
                }
                else
                {
                    ViewData["SucessMsg"] = "Register Not Success!";
                }
            }
            return View();
        }
        


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOut()
        {
            IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
            authenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }
    }
}