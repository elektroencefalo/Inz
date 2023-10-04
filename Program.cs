using MirekInzFinal.Database;
using MirekInzFinal.Models;
using MirekInzFinal.Services;
using Newtonsoft.Json;
using System.IO;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

var serializer = new JsonSerializer();
serializer.Formatting = Formatting.Indented;

var res = JsonTool.DeserializeReservationDatabase();
if (res == null)
{
    using (var file = File.CreateText(Path.Combine(Environment.CurrentDirectory, "Database/Reservations.json")))
    {
        var newModel = new ReservationCalendarModel();
        for (int i = 1; i < 14; i++)
        {
            var stationModel = new StationModel();
            stationModel.Name = $"Station{i}";
            for (int j = 0; j < 60; j++)
            {
                stationModel.ReservationDays.Add(new ReservationDayModel(Guid.NewGuid().ToString(), false, DateTime.UtcNow.AddDays(j)));
            }

            newModel.Station.Add(stationModel);
        }
        serializer.Serialize(file, newModel);
    }
}

var resUsers = JsonTool.DeserializeUserDatabase();

if (resUsers == null)
{
    using (var file = File.CreateText(Path.Combine(Environment.CurrentDirectory, "Database/Users.json")))
    {
        var users = new UserDatabase();

        users.Users.Add(new UserModel("admin", "admin@gmail.com", "admin", "Admin"));
        users.Users.Add(new UserModel("test1", "test1@gmail.com", "test", "User"));
        users.Users.Add(new UserModel("test2", "test2@gmail.com", "test", "User"));

        serializer.Serialize(file, users);
    }
}

Consts.reservation = JsonTool.DeserializeReservationDatabase();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();

app.UseCors(options => options.WithOrigins("http://localhost:44462").AllowAnyMethod().AllowAnyHeader());

app.MapControllers();
app.MapFallbackToFile("index.html"); ;

app.Run();
