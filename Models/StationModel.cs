namespace MirekInzFinal.Models
{
    public class StationModel
    {
        public string Name { get; set; } = string.Empty;

        public List<ReservationDayModel> ReservationDays { get; set; } = new List<ReservationDayModel>();

        public StationModel(string name, List<ReservationDayModel> reservationDays)
        {
            Name = name;
            ReservationDays = reservationDays;
        }

        public StationModel()
        {

        }
    }
}
