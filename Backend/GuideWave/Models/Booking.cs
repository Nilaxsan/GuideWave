namespace GuideWave.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public string PaymentInfo { get; set; }
        public int TouristID { get; set; }
        public int GuideID { get; set; }
        public Tourists Tour { get; set; }
        public Guide Guide { get; set; }

    }
}
