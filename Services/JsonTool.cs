using MirekInzFinal.Database;
using MirekInzFinal.Models;
using Newtonsoft.Json;

namespace MirekInzFinal.Services
{
    public static class JsonTool
    {
        public static UserDatabase DeserializeUserDatabase()
        {
            using (StreamReader file = File.OpenText(Path.Combine(Environment.CurrentDirectory, "Database/Users.json")))
            {
                var jsonString = file.ReadToEnd();

                return JsonConvert.DeserializeObject<UserDatabase>(jsonString);
            }
        }

        public static void SerializeUserDatabase(UserDatabase users)
        {
            var serializer = new JsonSerializer();
            serializer.Formatting = Formatting.Indented;

            using (var file = File.CreateText(Path.Combine(Environment.CurrentDirectory, "Database/Users.json")))
            {
                serializer.Serialize(file, users);
            }
        }

        public static ReservationCalendarModel DeserializeReservationDatabase()
        {
            using (StreamReader file = File.OpenText(Path.Combine(Environment.CurrentDirectory, "Database/Reservations.json")))
            {
                var jsonString = file.ReadToEnd();

                return JsonConvert.DeserializeObject<ReservationCalendarModel>(jsonString);
            }
        }

        public static void SerializeReservationDatabase(ReservationCalendarModel reservation)
        {
            var serializer = new JsonSerializer();
            serializer.Formatting = Formatting.Indented;

            try
            {
                using (var file = File.CreateText(Path.Combine(Environment.CurrentDirectory, "Database/Reservations.json")))
                {
                    serializer.Serialize(file, reservation);
                }
            }
            catch (Exception)
            {
                Consts.reservation = reservation;
            }
        }
    }
}