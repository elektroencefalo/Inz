using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MirekInzFinal.Database;
using MirekInzFinal.Models;
using MirekInzFinal.Services;

namespace MirekInzFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {

        [HttpGet()]
        public IActionResult Get()
        {

            return new OkObjectResult(Consts.reservation);
        }

        [HttpGet("{stationName}")]
        public IActionResult Get(string stationName)
        {

            return new OkObjectResult(Consts.reservation.Station.FirstOrDefault(station => station.Name == stationName));
        }

        [HttpGet("{stationName}/{fromDate}/{endDate}")]
        public IActionResult GetRange(string stationName, string fromDate, string endDate)
        {
            DateTime from = DateTime.Parse(fromDate);
            DateTime end = DateTime.Parse(endDate);

            StationModel stationToFiltr = new StationModel(); 
            stationToFiltr.Name = stationName;
            stationToFiltr.ReservationDays = Consts.reservation.Station.FirstOrDefault(station => station.Name == stationName).ReservationDays;
            if (stationToFiltr != null)
            {
                stationToFiltr.ReservationDays = stationToFiltr.ReservationDays.Where(day => day.DateOfReservation.Date >= from.Date && day.DateOfReservation.Date <= end.Date).ToList();
            }

            return new OkObjectResult(stationToFiltr);
        }

        [HttpPost]
        public IActionResult Post(StationModel station)
        {
            var result = new ReservationCalendarModel();
            try
            {
                ReservationCalendarModel reservation = JsonTool.DeserializeReservationDatabase();

                reservation.Station.Find(s => s.Name.Equals(station.Name)).ReservationDays = station.ReservationDays;

                Consts.reservation = reservation;

                JsonTool.SerializeReservationDatabase(reservation);
            }
            catch (Exception ex)
            {
                Thread.Sleep(150);
                Consts.reservation.Station.Find(s => s.Name.Equals(station.Name)).ReservationDays = station.ReservationDays;
                JsonTool.SerializeReservationDatabase(Consts.reservation);
            }

            return new OkObjectResult(Consts.reservation.Station.FirstOrDefault(s => s.Name.Equals(station.Name)));
        }
    }
}
