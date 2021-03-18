import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import {TrackingVehiculeService} from '../../../modele/TrackingVehicule/repository/tracking-vehicule.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrackingVehiculeList} from '../../../modele/TrackingVehicule/types/trackingVehicule';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  //general chart
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  //bus chart
  @ViewChild("specifiqueChart") specificChart: ChartComponent;
  public specificChartOptions: Partial<ChartOptions>;

  timeDelayBus: number = 0;
  timeDelayTram: number = 0;
  timeDelayMetro: number = 0;
  numberDelayBus: number = 0;
  numberDelayTram: number = 0;
  numberDelayMetro: number = 0;
  numberNotDelayMetro: number = 0;
  numberNotDelayTram: number = 0;
  numberNotDelayBus: number = 0;
  trackingVehicule: TrackingVehiculeList = [];

  formulaireDate: FormGroup = this.fb.group({
    DateControle: ["", Validators.required]
  });

  constructor(private TrackingvehiculeService: TrackingVehiculeService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.setGraphic();
    this.getInfoForWarning();
  }

  setGraphic() {
    this.chartOptions = {
      series: [],
      chart: {
        width: 250,
        type: "pie"
      },
      labels: ["Metro", "Bus", "Tram"],
      responsive: [
        {
          breakpoint: 20,
          options: {
            chart: {
              width: 5
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.specificChartOptions = {
      series: [],
      chart: {
        width: 250,
        type: "pie"
      },
      labels: ['Retard', 'Non Retard'],
      responsive: [
        {
          breakpoint: 20,
          options: {
            chart: {
              width: 5
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }


  getCountDelayBus(dateObser: string) {
    this.TrackingvehiculeService.getCountDelayFromBus(dateObser).subscribe(numberDelay => {
      this.numberDelayBus = numberDelay;
    });

  }

  getCountDelayMetro(dateObser: string) {
    this.TrackingvehiculeService.getCountDelayFromMetro(dateObser).subscribe(numberDelay => {
      this.numberDelayMetro = numberDelay;
    });
  }

  getCountDelayTram(dateObser: string) {
    this.TrackingvehiculeService.getCountDelayFromTram(dateObser).subscribe(numberDelay => {
      this.numberDelayTram = numberDelay;
    });
  }

  getTimeDelayFrombus(dateOb: string) {

    this.TrackingvehiculeService.getTimeDelayFromBus(dateOb).subscribe(timeDelay => {
      this.timeDelayBus = timeDelay;
    });

  }

  getTimeDelayFromMetro(dateOb: string) {
    this.TrackingvehiculeService.getTimeDelayFromMetro(dateOb).subscribe(timeDelay => {
      this.timeDelayMetro = timeDelay;
    });
  }

  getTimeDelayFromTram(dateOb: string) {

    this.TrackingvehiculeService.getTimeDelayFromTram(dateOb).subscribe(timeDelay => {
      this.timeDelayTram = timeDelay;
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

  getInfoForWarning() {
    this.TrackingvehiculeService.getInfoForWarning().subscribe(numberDelay => {
      this.trackingVehicule = numberDelay;
    });
  }


  send() {
    this.getCountNotDelayBus(this.formulaireDate.value.DateControle);
    this.getCountNotDelayTram(this.formulaireDate.value.DateControle);
    this.getCountNotDelayMetro(this.formulaireDate.value.DateControle);
    this.getCountDelayBus(this.formulaireDate.value.DateControle);
    this.getCountDelayTram(this.formulaireDate.value.DateControle);
    this.getCountDelayMetro(this.formulaireDate.value.DateControle);
    this.getTimeDelayFrombus(this.formulaireDate.value.DateControle);
    this.getTimeDelayFromMetro(this.formulaireDate.value.DateControle);
    this.getTimeDelayFromTram(this.formulaireDate.value.DateControle);
  }

  getHour(seconds: any): number {
    let hours = (Math.floor(seconds / 3600));
    return hours;
  }

  getMinute(seconds: any): number {
    let minutes = Math.floor(seconds / 60) - this.getHour(seconds) * 60;
    return minutes;
  }
}


