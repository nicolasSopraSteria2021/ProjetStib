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
import {ChartDataSets, ChartType} from 'chart.js';
import {LineForecast} from '../../../modele/lines/types/line-forecast';


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


  numberDelayBus: number = 0;
  numberDelayTram: number = 0;
  numberDelayMetro: number = 0;
  numberNotDelayMetro: number = 0;
  numberNotDelayTram: number = 0;
  numberNotDelayBus: number = 0;
  trackingVehicule: TrackingVehiculeList = [];

  titlePieChart='Nombre de retard depuis le 2021-01-01';
  bool : boolean= true;
  //linear chart
  barChartLegend = true;
  barChartPlugins = [];
  barChartType: ChartType = 'line';
  //DataForecast
  DataForecastChart: number[]=[];
  DataPrediction: number[]=[];
  LabelForecastChart: string[];
  dataForecast : LineForecast[]= [];

  public linearChartData: ChartDataSets[]=[];

  formulaireDate: FormGroup = this.fb.group({
    DateControle: ["", Validators.required]
  });


  constructor(private TrackingvehiculeService: TrackingVehiculeService, private fb: FormBuilder,private LineService : LineService) {

  }


  ngOnInit(): void {
    this.setGraphic();
    this.getForecastFromLine(13,"Jan 2021");
    this.getCountNotDelayBus('2021-01-01');
    this.getCountNotDelayTram('2021-01-01');
    this.getCountNotDelayMetro('2021-01-01');
    this.getCountDelayBus('2021-01-01');
    this.getCountDelayTram('2021-01-01');
    this.getCountDelayMetro('2021-01-01');
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

  //recupere les previsions des retards en fonction de la ligne donnée
  getForecastFromLine(selectedOptionLine : any, selectedOptionMonth){
    this.LineService.getForecastFromLine(selectedOptionLine,"Bus",selectedOptionMonth).subscribe(
      forecast => {
        this.dataForecast =forecast;
        this.DataForecastChart = [...this.dataForecast.map(data=>data.delayForecast)];
        this.LabelForecastChart = [...this.dataForecast.map(data=>data.hourArrival)];
        this.DataPrediction = [...this.dataForecast.map(data=>data.prediction)];
        this.linearChartData=[
          {
            data : this.DataForecastChart,label : 'Données réelles'
          },
          {
            data : this.DataPrediction,label : 'Données de predictions'
          }

        ];
        this.LabelForecastChart = this.dataForecast.map(dataTmp=>dataTmp.hourArrival);
      });
  }
  send() {
    this.getCountNotDelayBus(this.formulaireDate.value.DateControle);
    this.getCountNotDelayTram(this.formulaireDate.value.DateControle);
    this.getCountNotDelayMetro(this.formulaireDate.value.DateControle);
    this.getCountDelayBus(this.formulaireDate.value.DateControle);
    this.getCountDelayTram(this.formulaireDate.value.DateControle);
    this.getCountDelayMetro(this.formulaireDate.value.DateControle);

  }
  public chartClicked(e: any): void {
    console.log(e);
  }


  toggle() {
    this.bool=false;
  }
}


