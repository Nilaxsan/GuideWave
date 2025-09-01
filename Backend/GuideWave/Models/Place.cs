using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuideWave.Models
{
    public class Place
    {
        [Key]
        public int PlaceId { get; set; }
        public string PlaceName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public string[] Availability {  get; set; }
        // Foreign Key
        public int GuideId { get; set; }

        // Navigation property (many places belong to one guide)
        [ForeignKey("GuideId")]
        public Guide Guide { get; set; }

    }
}
