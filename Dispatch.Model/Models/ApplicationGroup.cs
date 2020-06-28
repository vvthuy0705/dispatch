﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Model.Models
{
    /// <summary>
    /// chứa danh sách các nhóm user
    /// </summary>

    [Table("ApplicationGroups")]
    public class ApplicationGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [StringLength(250)]

        public string Name { get; set; }
        [StringLength(250)]

        public string Description { get; set; }
    }
}
