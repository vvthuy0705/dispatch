using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dispatch.Web.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage="You need enter name")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "You need enter name login")]

        public string UserName { get; set; }


        [Required(ErrorMessage = "You need enter password")]
        [MinLength(6,ErrorMessage ="Password lenght 6 ")]
        public string Pasword { get; set; }
        [Required(ErrorMessage = "You need enter email")]
        [EmailAddress(ErrorMessage ="Address email not failed")]

        public string Email { get; set; }
        [Required(ErrorMessage = "You need name")]

        public string  Address { get; set; }
        [Required(ErrorMessage = "You need enter phone number")]

        public string PhoneNumber { get; set; }

    }
}