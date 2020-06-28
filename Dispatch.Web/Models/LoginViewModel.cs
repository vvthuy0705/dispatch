using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dispatch.Web.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage ="You neer enter account!")]
        public string UserName { get; set; }
        [Required(ErrorMessage ="You need enter password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}