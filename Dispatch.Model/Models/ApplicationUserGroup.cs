using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dispatch.Model.Models
{
    /// <summary>
    /// quản lý user thuộc nhóm nào
    /// </summary>
    public class ApplicationUserGroup
    {
        /// <summary>
        /// có 2 trường làm key thì phải có order xác định trường nào đầu tiên
        /// </summary>
        [Key]
        [StringLength(128)]
        [Column(Order = 1)]
        public string UserId { get; set; }

        [Key]
        [Column(Order=2)]
        public int GroupId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [ForeignKey("GroupId")]
        public virtual ApplicationGroup ApplicationGroup { get; set; }
    }
}