import {StationModel} from "./station.model";

export class ReservationModel {
  public station: StationModel[]

  constructor(station: StationModel[]) {
    this.station = station
  }
}
