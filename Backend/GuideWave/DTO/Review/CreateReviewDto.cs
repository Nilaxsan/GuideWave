namespace GuideWave.DTO.Review
{
    public class CreateReviewDto
    {
        public int Ratings { get; set; }
        public string Feedback { get; set; }

        public int GuideId { get; set; }
        public int TouristId { get; set; }
    }
}
