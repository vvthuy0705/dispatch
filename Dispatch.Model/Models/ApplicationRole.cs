using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Model.Models
{
    /// <summary>
    /// quản lý các quyền Các quyền
    /// </summary>
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base()
        {

        }

        [StringLength(250)]
        public string Description { get; set; }



    }
}
