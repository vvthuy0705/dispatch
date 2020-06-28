using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dispatch.Model
{
    [Table("Errors")]
    public class Error
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Message { get; set; }

        public string Stacktrace { get; set; }

        public System.DateTime CreatedDate { get; set; }
    }
}