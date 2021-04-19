import { Component, Input, OnInit} from '@angular/core';
import {LineService} from '../../../modele/lines/repository/line.service';
import {Line} from '../../../modele/lines/types/line';
import {TrackingVehiculeForTable} from '../../../modele/TrackingVehicule/types/tracking-vehicule-for-table';
import {TrackingVehiculeService} from '../../../modele/TrackingVehicule/repository/tracking-vehicule.service';
import {InfoMostDelay} from '../../../modele/TrackingVehicule/types/info-most-delay';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {LineForecast} from '../../../modele/lines/types/line-forecast';
import {Label} from 'ng2-charts';
import {DetailsWeather} from '../../../modele/lines/types/details-weather';



@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {
  //static variable
  years: any = 2021;
  //title
  lineGraphTitle : string = '';
  yearGraphTitle : string = '';
  monthGraphTitle : string = '';
  weatherGraphTitle :string ='';


  //Attribut
  @Input() vehicule_type: string;
  lines: Line[] = [];
  NumberOfLine: any = [];
  lineMostDelay: InfoMostDelay;

  monthNumber: string;
  YearsNumber: string;

  //attribut pour le barchart
  LineNumberForChart: any = [];
  countDelayByLine: ChartDataSets[]=[];

//setting for all chart
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        }]
    }
  };
  //setting for all chart
  public chartOptionsRadar: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };
  chartLegend = true;

  barChartType: ChartType = 'bar';

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {

      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks : {
            beginAtZero:true
          }
        },
        {

          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(0,255,0,0.3)',
          },
          ticks: {
            beginAtZero:true,
            fontColor: 'green',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange'
          }
        },
      ],
    },
  };

  //valeur pour les select.
  selectedOptionLine: any;
  selectedOptionMonth: any;
  bool: boolean;
  showSpeficic: boolean = false;
  //linear chart
  chartType: ChartType = 'line';
  DataLinear: number[] = [];
  labelLinear: string[] = [];
  dataChartSetHour : ChartDataSets[]=[];
  dataForTables: TrackingVehiculeForTable[] = [];
  public dataMonthCharset: ChartDataSets[]=[];
  //graph day
  DataDay: number[] = [];
  labelDay: string[] = [];
  DataDayChart: TrackingVehiculeForTable[] = [];
   dataDayCharset: ChartDataSets[]=[];
  ChartTypeMixed: ChartType = 'line';

  //DataForecast
  LabelForecastChart: string[];
  dataForecast: LineForecast[] = [];
//constructor et ngOnInit
  public barChartData: ChartDataSets[];

  //piecharts
  dataPieChart: DetailsWeather;
  pieChartLabels: Label[] = ['Vitesse du vent (%)','Précipitation neige (%) ', 'Taux de précipitation (%) ','Température (%)','Visibilité (%)'];

  pieChartDataSet: ChartDataSets[] = [
    {data: []}
  ];
  pieChartType: ChartType = 'radar';

  constructor(private LineService: LineService, private trackingService: TrackingVehiculeService) {

  }

  ngOnInit(): void {
    this.getYearsFromDb();
    this.getMonthFromDb();
    this.getCountLineForGraph(this.years);
    this.getLineFromCategory();
    this.getInfoForTable(this.years);
    this.GetInfoForMostDelay(this.years);
    this.getForecastFromLine(17, "Feb 2021");
    this.getDayByMonth("Feb 2021");
  }

//methode
  //recupere les previsions des retards en fonction de la ligne donnée
  getForecastFromLine(selectedOptionLine: any, selectedOptionMonth) {
    this.LineService.getForecastFromLine(selectedOptionLine, this.vehicule_type, selectedOptionMonth).subscribe(
      forecast => {
        this.dataForecast = forecast;
        this.dataChartSetHour=[

          {
            data: this.dataForecast.map(data => data.delayForecast),label:'Nombre de retard (réel)',yAxisID: 'y-axis-0',type:'line'
          },
          {
            data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)', yAxisID: 'y-axis-0', type: 'line'
          },
          {
            data: this.dataForecast.map(data => data.precip), label: 'Précipitation pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
          }
          ];
        this.LabelForecastChart = this.dataForecast.map(data => data.hourArrival);
        this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
      });
  }
  getInfoForTable(value: any) {
    this.trackingService.getInfoForTable(this.vehicule_type, value).subscribe(dataTmp => {
      this.dataForTables = dataTmp;

      this.labelLinear = this.dataForTables.map(dataTmp => dataTmp.dateObservation+" "+value);
      //changement du titre pour le graphique
      this.yearGraphTitle = "Graphique représentant le nombre de retard pour l'année "+value;
      //set data du graphique
      this.dataMonthCharset = [
        {
          data : this.dataForTables.map(data => data.count),label : 'Nombre de retard'
        }
      ];
    });
  }

  //recupere les infos de la ligne la plus en retards
  GetInfoForMostDelay(value: any) {
    this.trackingService.GetInfoForMostDelay(this.vehicule_type, value).subscribe(data => {
      this.lineMostDelay = data
    });
  }

  //recupere les le numero des lignes et le nombre de retards pour le barchart
  getCountLineForGraph(value: any) {
    this.LineService.getLineChart(this.vehicule_type, value).subscribe(
      TmpLines => {
        this.lines = TmpLines;
        this.countDelayByLine=[
          {
            data :this.lines.map(line => line.numberOfDelay),label : 'Nombre de retard'
          }
        ];
        this.LineNumberForChart = this.lines.map(line => "line n°" + line.lineNumber + "-" + line.countStopName + "arrets");
        // this.countStopName = this.lines.map(line=>line.numberOfDelay/line.countStopName);
        this.lineGraphTitle="Graphique représentant le nombre de retard en fonction des lignes pour l'année "+value
      });
  }

  //recupere toutes lignes
  getLineFromCategory() {
    this.LineService.getLineNumberFromCategory(this.vehicule_type).subscribe
    (
      numberOfLine => {
        this.NumberOfLine = numberOfLine;
      }
    );
  }

  //lorsqu'on appuie sur le bouton la requete necessitant le numero de ligne est envoyé
  executeForm() {
    this.getForecastFromLine(this.selectedOptionLine, this.selectedOptionMonth);
  }

  //recupere les mois

  getMonthFromDb() {
    this.LineService.getMonthFromDb().subscribe(
      month => {
        this.monthNumber = month;
      });
  }

  getDayByMonth(monthValue: string) {
    this.trackingService.getDayByMonth(this.vehicule_type, monthValue, monthValue).subscribe(
      dataTmp => {
        this.DataDayChart = dataTmp;
        //change le titre du graphique
        this.monthGraphTitle = 'Graphique représentant le nombre de retard pour le mois de '+monthValue;
        //definit les données
        this.labelDay = this.DataDayChart.map(dataTmp => dataTmp.dateObservation);
        this.dataDayCharset = [
          {
            data: this.DataDayChart.map(data => data.count), label: 'Nombre de retard (réel)'
          },
          {
            data: this.DataDayChart.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
          },
          {
            data: this.DataDayChart.map(data => data.precip), label: 'Précipitation pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
          }];
        this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
      });
  }

  //recupere les années
  getYearsFromDb() {
    this.LineService.getYearsFromDb().subscribe(
      yearDb => {
        this.YearsNumber = yearDb;
      }
    );
  }

  //recupere les details de la météo

  getDetailsWeather(dateValue: string) {
    this.LineService.getDetailsWeather(dateValue).subscribe(
      tmpData => {
        this.weatherGraphTitle = 'Graphique représentant les données météo de la journée du '+ dateValue;
        this.dataPieChart = tmpData;
        this.pieChartDataSet = [
          {
            data: [
              this.dataPieChart.windSpeed
              ,this.dataPieChart.snow
              , this.dataPieChart.precip
              ,this.dataPieChart.relativeHumidity
              , this.dataPieChart.visibility
            ]
          }
        ];
      });
  }

  public chartClicked(e: any): void {
    console.log(this.labelLinear[e.active[0]._index]);
      this.getDayByMonth(this.labelLinear[e.active[0]._index]);
      this.showSpeficic=true;
  }

  changeYearsData(value: string) {
    this.getCountLineForGraph(value);
    this.getInfoForTable(value);
    this.GetInfoForMostDelay(value);
    this.years=value;
  }

  specificChartClicked(e:any) {
    this.bool = true;
    this.getDetailsWeather(this.labelDay[e.active[0]._index]);

  }

  ChangeParam(param :number,type:number) {
    if(type==1) {
      switch (param) {
        case 1:
          this.dataChartSetHour = [
            {
              data: this.dataForecast.map(data => data.delayForecast), label: 'Nombre de retard'
            },
            {
              data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast.map(data => data.snow), label: 'Précipitation neige (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 2:
          this.dataChartSetHour = [
            {
              data:this.dataForecast.map(data => data.delayForecast), label: 'Nombre de retard'
            },
            {
              data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast.map(data => data.precip), label: 'Précipitation pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 3:
          this.dataChartSetHour = [
            {
              data: this.dataForecast.map(data => data.delayForecast), label: 'Nombre de retard'
            },
            {
              data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast.map(data => data.visibility), label: 'Niveau de visibilité (Km)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 4:
          this.dataChartSetHour = [
            {
              data:  this.dataForecast.map(data => data.delayForecast), label: 'Nombre de retard'
            },
            {
              data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast.map(data => data.windSpeed), label: 'Vitesse du vent (km/h)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 5:
          this.dataChartSetHour = [
            {
              data:  this.dataForecast.map(data => data.delayForecast), label: 'Nombre de retard',yAxisID: 'y-axis-0', type: 'bar'
            },
            {
              data: this.dataForecast.map(data => data.prediction), label: 'Nombre de retard (prediction)', yAxisID: 'y-axis-0', type: 'bar'
            },
            ];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;

      }
    }
    if(type==2) {
      switch (param) {
        case 1:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart.map(data => data.count), label: 'Nombre de retard'
            },
            {
              data: this.DataDayChart.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
            },
            {
              data: this.DataDayChart.map(data => data.snow), label: 'Précipitation neige (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 2:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart.map(data => data.count), label: 'Nombre de retard'
            },
            {
              data: this.DataDayChart.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
            },
            {
              data: this.DataDayChart.map(data => data.precip), label: 'Précipitation pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 3:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart.map(data => data.count), label: 'Nombre de retard'
            },
            {
              data: this.DataDayChart.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
            },
            {
              data: this.DataDayChart.map(data => data.visibility), label: 'Niveau de visibilité (Km)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 4:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart.map(data => data.count), label: 'Nombre de retard'
            },
            {
              data: this.DataDayChart.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
            },
            {
              data: this.DataDayChart.map(data => data.windSpeed), label: 'Vitesse du vent (km/h)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
      }
    }
  }


}
