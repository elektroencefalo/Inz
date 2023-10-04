import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MaterialModule} from 'src/material.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import {FooterComponent} from "./footer/footer.component";
import {GaleriaComponent} from "./galeria/galeria.component";
import {LoginComponent} from "./login/login.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {RegisterComponent} from "./register/register.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AboutComponent} from "./about/about.component";
import {RegulaminComponent} from "./regulamin/regulamin.component";
import {StanowiskaComponent} from "./stanowiska/stanowiska.component";
import {KalendarzComponent} from "./kalendarz/kalendarz.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import {ModalComponent} from "./Modal/modal.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    ModalComponent,
    RegulaminComponent,
    StanowiskaComponent,
    AboutComponent,
    KalendarzComponent,
    HomeComponent,
    GaleriaComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgbModule,
    CarouselModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'footer', component: FooterComponent },
      { path: 'home', component: HomeComponent },
      { path: 'galeria', component: GaleriaComponent },
      { path: 'kalendarz', component: KalendarzComponent },
      { path: 'regulamin', component: RegulaminComponent },
      { path: 'login', component: LoginComponent },
      { path: 'stanowiska', component: StanowiskaComponent },
      { path: 'kalendarz/:id', component: KalendarzComponent },
      { path: 'kalendarz/:id/:fromDate/:endDate', component: KalendarzComponent },
      { path: 'about', component: AboutComponent },
      { path: 'register', component: RegisterComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
