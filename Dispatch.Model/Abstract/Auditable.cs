using System.ComponentModel.DataAnnotations;
using Dispatch.Abstract;
using System;

namespace Dispatch.Model
{
    /// <summary>
    /// lớp chứa các thuộc tính chung
    /// </summary>
    public abstract class Auditable : IAuditable
    {

        public DateTime? CreatedDate { set; get; }
        [MaxLength(256)] // chỉ ra độ dai của no trong database
        public string CreatedBy { set; get; }
        public DateTime? UpdateDate { get; set; }
        [MaxLength(256)]
        public string UpdateBy { get; set; }

        [MaxLength(256)]
        public string MetaKeyWord { set; get; }
        [MaxLength(256)]
        public string MetaDescription { get; set; }

        public bool Status { get; set; }
    }
}
