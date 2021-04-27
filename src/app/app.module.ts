import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './View/commons/nav/nav.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusComponent } from './View/vehicule/bus/bus.component';
import { MetroComponent } from './View/vehicule/metro/metro.component';
import { TramComponent } from './View/vehicule/tram/tram.component';
import { AccueilComponent } from './View/commons/accueil/accueil.component';
import {SidebarModule} from 'ng-sidebar';
import { NgApexchartsModule } from "ng-apexcharts";
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { GraphiquesComponent } from './View/commons/graphiques/graphiques.component';
import {ChartsModule} from 'ng2-charts';





@NgModule({
  declarations: [
    AppComponent,
    BusComponent,
    NavComponent,
    MetroComponent,
    TramComponent,
    AccueilComponent,
    GraphiquesComponent


  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot(),
    NgApexchartsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatCardModule,
    ChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
