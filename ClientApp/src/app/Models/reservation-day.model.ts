export class ReservationDayModel {
  public id: string;
  public username: string;
  public userID: string;
  public isReserved: boolean;
  public isPending: boolean;
  public dateOfReservation: string

  constructor(id: string, username: string, userID: string, isReserved: boolean, isPending: boolean, dateOfReservation: string) {
    this.id = id;
    this.username = username;
    this.userID = userID;
    this.isReserved = isReserved;
    this.isPending = isPending;
    this.dateOfReservation = dateOfReservation;
  }
}

