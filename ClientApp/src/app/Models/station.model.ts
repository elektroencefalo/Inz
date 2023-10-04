import {ReservationDayModel} from "./reservation-day.model";

export class StationModel {
  public name: string;
  public reservationDays: ReservationDayModel[]

  constructor(name: string, reservationDays: ReservationDayModel[]) {
    this.name = name;
    this.reservationDays = reservationDays;
  }
}
