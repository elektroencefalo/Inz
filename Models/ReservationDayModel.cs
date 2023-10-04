namespace MirekInzFinal.Models
{
    public class ReservationDayModel
    {
        public string ID { get; set; } = string.Empty;

        public string Username { get; set; }= string.Empty;

        public string UserID { get; set; } = string.Empty;

        public bool IsReserved { get; set; }

        public bool IsPending { get; set; }

        public DateTime DateOfReservation { get; set; }

        public ReservationDayModel(string iD, bool isReserved, DateTime dateOfReservation)
        {
            ID = iD;
            IsReserved = isReserved;
            DateOfReservation = dateOfReservation;
        }
    }
}