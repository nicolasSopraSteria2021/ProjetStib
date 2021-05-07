import {Component, OnInit, ViewChild} from '@angular/core';
import {LineService} from '../../../modele/lines/repository/line.service';
import {ChartComponent} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import {TrackingVehiculeService} from '../../../modele/TrackingVehicule/repository/tracking-vehicule.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrackingVehiculeList} from '../../../modele/TrackingVehicule/types/trackingVehicule';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {LineForecast} from '../../../modele/lines/types/line-forecast';
import {DateValidator} from '../../../utile/DateValidator';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  //bus chart
  @ViewChild("specifiqueChart") specificChart: ChartComponent;
  public specificChartOptions: Partial<ChartOptions>;

  labels: Label[] = ['Retards Bus','Retards Tram'];
  labelsSpecific: Label[] = ['Retards','Non Retards'];
  numberDelayBus: number = 0;
  numberDelayTram: number = 0;
  numberDelayMetro: number = 0;
  numberNotDelayTram: number = 0;
  numberNotDelayBus: number = 0;
  trackingVehicule: TrackingVehiculeList = [];

  titlePieChart='Proportion de retards depuis le 2021-01-01';
  bool : boolean= true;

  barChartType: ChartType = 'pie';
//setting for all chart
  chartLegend =true;
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    }
  };



  formulaireDate: FormGroup = this.fb.group({
    DateControle:['', Validators.compose([Validators.required, DateValidator.dateValidator])],
  });


  constructor(private TrackingvehiculeService: TrackingVehiculeService, private fb: FormBuilder) {

  }


  ngOnInit(): void {
    this.getCountNotDelayBus('2021-01-01');
    this.getCountNotDelayTram('2021-01-01');
    this.getCountDelayBus('2021-01-01');
    this.getCountDelayTram('2021-01-01');
  }

  getCountDelayBus(dateObser: string) {
    this.TrackingvehiculeService.getCountDelayFromBus(dateObser).subscribe(numberDelay => {
      this.numberDelayBus = numberDelay;
    });

  }

  getCountDelayTram(dateObser: string) {
    this.TrackingvehiculeService.getCountDelayFromTram(dateObser).subscribe(numberDelay => {
      this.numberDelayTram = numberDelay;
    });
  }

  //NOT DELAY

  getCountNotDelayBus(dateObser: string) {
    this.TrackingvehiculeService.getCountNotDelayFromBus(dateObser).subscribe(numberDelay => {
      this.numberNotDelayBus = numberDelay;
    });
  }

  getCountNotDelayTram(dateObser: string) {
    this.TrackingvehiculeService.getCountNotDelayFromTram(dateObser).subscribe(numberDelay => {
      this.numberNotDelayTram = numberDelay;
    });
  }

  getCountNotDelayMetro(dateObser: string) {
    this.TrackingvehiculeService.getCountNotDelayFromMetro(dateObser).subscribe(numberDelay => {
      this.numberDelayMetro = numberDelay;
    });
  }

  send() {
    this.getCountNotDelayBus(this.formulaireDate.value.DateControle);
    this.getCountNotDelayTram(this.formulaireDate.value.DateControle);
    this.getCountNotDelayMetro(this.formulaireDate.value.DateControle);
    this.getCountDelayBus(this.formulaireDate.value.DateControle);
    this.getCountDelayTram(this.formulaireDate.value.DateControle);
  }

}


