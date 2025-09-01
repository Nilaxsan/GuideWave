using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuideWave.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        public int Ratings { get; set; }
        public DateTime Timestamp { get; set; }
        public string Feedback { get; set; }

        // Foreign Keys
        public int GuideId { get; set; }
        public int TouristId { get; set; }

        // Navigation Properties
        [ForeignKey("GuideId")]
        public virtual Guide Guide { get; set; }

        [ForeignKey("TouristId")]
        public virtual Tourists Tourist { get; set; }
    }
}
