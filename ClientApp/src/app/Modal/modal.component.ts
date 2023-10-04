import {Component, ViewChild, ElementRef} from '@angular/core';
import {ReservationDayModel} from "../Models/reservation-day.model";
import {StationModel} from "../Models/station.model";

@Component({
  selector: 'app-modal',
  template: `
    <div #myModal class="container">
      <div *ngIf="currentItem" class="content">
        <h5>User : {{currentItem.username}}</h5>
        <h5>Day : {{currentItem.dateOfReservation | date}}</h5>
        <mat-checkbox class="example-margin" [(ngModel)]="currentItem.isPending">Is Pending</mat-checkbox>
        <mat-checkbox class="example-margin" [(ngModel)]="currentItem.isReserved">Is Reserved</mat-checkbox>
        <div><br></div>
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // @ts-ignore
  currentItem: ReservationDayModel
  // @ts-ignore
  stationModel: StationModel;

  // @ts-ignore
  @ViewChild('myModal', {static: false}) modal: ElementRef;

  open(currentItem: ReservationDayModel, stationModel: StationModel) {
    this.currentItem = currentItem;
    this.stationModel = stationModel;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.setCurrentItemsParams(this.currentItem);
    this.modal.nativeElement.style.display = 'none';
  }

  setCurrentItemsParams(reservationDayModel: ReservationDayModel) {
    let index = this.stationModel?.reservationDays.findIndex(day => {
      return day.dateOfReservation == reservationDayModel.dateOfReservation;
    });

    if (reservationDayModel.isReserved) {
      this.stationModel.reservationDays[index].isReserved = true;
      this.stationModel.reservationDays[index].isPending = false;
    }
  }
}
