import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ReservationService} from "../Services/reservation.service";
import {StationModel} from "../Models/station.model";
import {ReservationDayModel} from "../Models/reservation-day.model";
import {ModalComponent} from "../Modal/modal.component";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-kalendarz',
  templateUrl: './kalendarz.component.html',
  styleUrls: ['./kalendarz.component.css'],
  providers: [NgbCarouselConfig],
})
export class KalendarzComponent implements OnInit, OnDestroy {
  // @ts-ignore
  id: number;
  fromDate: string = "";
  endDate: string = "";
  private sub: any;
  // @ts-ignore
  @ViewChild('modal', {static: false}) modal: ModalComponent

  // @ts-ignore
  stationModel: StationModel;
  isAdmin: boolean;
  isUser: boolean;
  username: string = "";
  currentItem: ReservationDayModel | undefined;

  constructor(private reservationService: ReservationService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.isAdmin = sessionStorage.getItem('userRole') === "Admin";
    this.isUser = sessionStorage.getItem('userRole') === "User";
    // @ts-ignore
    this.username = sessionStorage.getItem('userName')?.toString()

  }

  setReservation(reservationDayModel: ReservationDayModel) {
    if (this.isAdmin || this.isUser) {
      let index = this.stationModel?.reservationDays.findIndex(day => {
        return day.dateOfReservation == reservationDayModel.dateOfReservation;
      });

      if (reservationDayModel.isPending && this.isAdmin) {
        this.modal.open(reservationDayModel, this.stationModel);
        return;
      }

      if (this.isAdmin) {
        this.stationModel.reservationDays[index].isReserved = !this.stationModel.reservationDays[index].isReserved;
        this.stationModel.reservationDays[index].isPending = false;
      } else if (this.isUser) {
        if (reservationDayModel.isPending && reservationDayModel.username == this.username) {
          this.stationModel.reservationDays[index].isPending = false;
        } else if (!reservationDayModel.isReserved) {
          this.stationModel.reservationDays[index].isPending = true;
          // @ts-ignore
          this.stationModel.reservationDays[index].username = sessionStorage.getItem('userName').toString();
        }
      }
    }
  }

  saveReservation() {
    this.reservationService.setSpecifiedReservation(this.stationModel.name, this.stationModel.reservationDays).subscribe(res => {
      this.stationModel = res;
      this.toastr.info('Rezerwacja zapisana');
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id < 1 || this.id>13){
        this.id = 1;
      }
      this.fromDate = params['fromDate'];
      this.endDate = params['endDate'];
      if (this.fromDate  && this.endDate ) {
        this.reservationService.getSpecifiedReservationWithRange("Station" + this.id, this.fromDate, this.endDate).subscribe(res => {
          this.stationModel = res;
        })
      } else {
        this.reservationService.getSpecifiedReservation("Station" + this.id).subscribe(res => {
          this.stationModel = res;
        })
      }
    });
  }
}



