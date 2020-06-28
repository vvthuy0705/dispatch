using System;

namespace Dispatch.Abstract
{
    // interface này dùng chung
    public interface IAuditable
    {
        DateTime? CreatedDate { set; get; } // ? :null able
        string CreatedBy { set; get; }
        DateTime? UpdateDate { get; set; }
        string UpdateBy { get; set; }

        string MetaKeyWord { set; get; }
        string MetaDescription { get; set; }

        bool Status { get; set; }
    }
}