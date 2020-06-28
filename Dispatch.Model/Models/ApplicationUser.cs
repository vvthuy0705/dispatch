using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dispatch.Model
{
    /// <summary>
    /// lớp khởi tạo identity cho user khi đăng  ký 
    /// </summary>
    public class ApplicationUser : IdentityUser
    {

        [MaxLength(256)]
        public string FullName { get; set; }
        [MaxLength(256)]
        public string Address { get; set; }
        public DateTime? BirthDay { get; set; }

        /// <summary> 
        /// tạo ra identity cho user
        /// </summary>
        /// <param name="manager"></param>
        /// <returns></returns>
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ExternalCookie);
            // Add custom user claims here
            return userIdentity;
        }


    }
}