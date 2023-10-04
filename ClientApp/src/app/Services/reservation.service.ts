import {Inject, Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {ReservationModel} from "../Models/reservation.model";
import {StationModel} from "../Models/station.model";
import {ReservationDayModel} from "../Models/reservation-day.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl: string = '';

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    if(environment.production)
    {
      this.baseUrl = baseUrl;
    }
    else {
      this.baseUrl = baseUrl.split(':')[1];
      this.baseUrl = this.baseUrl + ':5058/';
    }
  }

  getReservation() {
    return this.http.get<ReservationModel>(this.baseUrl + 'api/Reservation');
  }

  getSpecifiedReservation(stationName: string) {
    return this.http.get<StationModel>(this.baseUrl + 'api/Reservation/' + stationName);
  }

  getSpecifiedReservationWithRange(stationName: string, fromDate: string, endDate: string) {
    return this.http.get<StationModel>(this.baseUrl + `api/Reservation/${stationName}/${fromDate}/${endDate}`);
  }

  setSpecifiedReservation(name: string, reservationDays: ReservationDayModel[]) {
    return this.http.post<StationModel>(this.baseUrl + 'api/Reservation', {name, reservationDays});
  }

}
