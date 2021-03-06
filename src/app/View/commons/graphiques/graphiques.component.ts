import { Component, Input, OnInit} from '@angular/core';
import {LineService} from '../../../modele/lines/repository/line.service';
import {Line} from '../../../modele/lines/types/line';
import {TrackingVehiculeForTable} from '../../../modele/TrackingVehicule/types/tracking-vehicule-for-table';
import {TrackingVehiculeService} from '../../../modele/TrackingVehicule/repository/tracking-vehicule.service';
import {InfoMostDelay} from '../../../modele/TrackingVehicule/types/info-most-delay';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {LineForecast} from '../../../modele/lines/types/line-forecast';
import {Label} from 'ng2-charts';
import {DetailsWeathers} from '../../../modele/lines/types/details-weathers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit {
  formulaire: FormGroup = this.fb.group({
    selectLine: ["", Validators.required],
    selectMonth: ["", Validators.required]
  });

  //static variable
  years: any = 2021;
  //title
  hourGraphTitle : string = '';
  lineGraphTitle : string = '';
  yearGraphTitle : string = '';
  monthGraphTitle : string = '';
  weatherGraphTitle :string ='';


  //Attribut
  @Input() vehicule_type: string;
  lines$: Line[] = [];
  NumberOfLine$: any = [];
  lineMostDelay$: InfoMostDelay;

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
  chartLegend =true;
  chartLegendRadar =false;
  barChartType: ChartType = 'bar';


  public lineChartOptions: ChartOptions  = {
    //true = s'adapte ?? l'??cran
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          //d??finition de l'axe Y gauche pour les linearChart
          id: 'y-axis-0',
          position: 'left',
          ticks : {
            //le graphique commence ?? 0
            beginAtZero:true
          }},
        {
          //d??finition de l'axe y droite pour les barCharts
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(0,255,0,0.3)',
          },
          ticks: {
            beginAtZero: true,
            fontColor: 'green'
          }}]}
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
  dataForTables$: TrackingVehiculeForTable[] = [];
  public dataMonthCharset: ChartDataSets[]=[];
  //graph day
  DataDay: number[] = [];
  labelDay: string[] = [];
  DataDayChart$: TrackingVehiculeForTable[] = [];
   dataDayCharset: ChartDataSets[]=[];
  ChartTypeMixed: ChartType = 'line';

  //DataForecast
  LabelForecastChart: string[];
  dataForecast$: LineForecast[] = [];
//constructor et ngOnInit
  public barChartData: ChartDataSets[];

  //piecharts
  dataPieChart$: DetailsWeathers;
  pieChartLabels: Label[] = ['Vitesse du vent (%)','Pr??cipitation neige (%) ', 'Taux de pr??cipitation (%) ','Temp??rature (%)','Visibilit?? (%)'];

  pieChartDataSet: ChartDataSets[] = [
    {data: []}
  ];
  pieChartType: ChartType = 'radar';



  constructor(private LineService: LineService,private fb: FormBuilder ,private trackingService: TrackingVehiculeService) {}

  ngOnInit(): void {
    this.getYearsFromDb();
    this.getMonthFromDb();
    this.getCountLineForGraph(this.years);
    this.getLineFromCategory();
    //this.getInfoForTable(this.years);
    this.GetInfoForMostDelay(this.years);
    if(this.vehicule_type=='Tram') {
      this.getForecastFromLine(82, "Feb 2021");
      this.getDayByMonth("Feb 2021", 82);
  }
    else{
      this.getForecastFromLine(17, "Feb 2021");
      this.getDayByMonth("Feb 2021", 17);
    }
    this.getDetailsWeather("Feb  23 2021");
  }

  //recupere les previsions des retards en fonction de la ligne donn??e
  getForecastFromLine(selectedOptionLine: any, selectedOptionMonth) {
    //appel de la m??thode getForecastFromLine de LineService
    this.LineService.getForecastFromLine(selectedOptionLine, this.vehicule_type, selectedOptionMonth).subscribe(
      forecast => {
        //on recup??re l'objet pour le mapping
        this.dataForecast$ = forecast;
        //titre du graphique avec les valeurs s??lectionners
        this.hourGraphTitle =
          'Graphique repr??sentant la moyenne des retards pour chaque heure du mois de '+selectedOptionMonth +' de la ligne '+selectedOptionLine;
        //Attributions des valeurs aux dataSet du graphique
        this.dataChartSetHour=[
          {
            data: this.dataForecast$.map(data => data.delayForecast),label:'Nombre de retards (r??els)',yAxisID: 'y-axis-0',type:'line'
          },
          {
            data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (pr??dictions)', yAxisID: 'y-axis-0', type: 'line'
          },
          {
            data: this.dataForecast$.map(data => data.precip), label: 'Pr??cipitations pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
          }
          ];
        //axe des X
        this.LabelForecastChart = this.dataForecast$.map(data => data.hourArrival);
        //changement de la couleur pour le troisi??me jeu de donn??es
        this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
      });
  }
  getInfoForTable(value: any) {
    this.trackingService.getInfoForTable(this.vehicule_type, value).subscribe(dataTmp => {
      this.dataForTables$ = dataTmp;

      this.labelLinear = this.dataForTables$.map(dataTmp => dataTmp.dateObservation+" "+value);
      //changement du titre pour le graphique
      this.yearGraphTitle = "Graphique repr??sentant le nombre de retards pour l'ann??e "+value;
      //set data du graphique
      this.dataMonthCharset = [
        {
          data : this.dataForTables$.map(data => data.count),label : 'Nombre de retards'
        }
      ];
    });
  }

  //recupere les infos de la ligne la plus en retards
  GetInfoForMostDelay(value: any) {
    this.trackingService.GetInfoForMostDelay(this.vehicule_type, value).subscribe(data => {
      this.lineMostDelay$ = data;
    });
  }

  //recupere les le numero des lignes et le nombre de retards pour le barchart
  getCountLineForGraph(value: any) {
    this.LineService.getLineChart(this.vehicule_type, value).subscribe(
      TmpLines => {
        this.lines$ = TmpLines;
        this.countDelayByLine=[
          {
            data :this.lines$.map(line => line.delays),label : 'Nombre de retards (r??els)'
          }/*,
          {
            data :this.lines.map(line => line.lineNumber),label : 'Nombre de retards (predictions)'
          } */
        ];
        this.LineNumberForChart = this.lines$.map(line => "line n??" + line.lineNumber + "-" + line.countStopName + "arrets");
        //this.LineNumberForChart = this.lines.map(line =>line.countStopName);
        // this.countStopName = this.lines.map(line=>line.numberOfDelay/line.countStopName);
        this.lineGraphTitle="Graphique repr??sentant le nombre de retards en fonction des lignes pour l'ann??e "+value
      });
  }

  //recupere toutes lignes
  getLineFromCategory() {
    this.LineService.getLineNumberFromCategory(this.vehicule_type).subscribe
    (
      numberOfLine => {
        this.NumberOfLine$ = numberOfLine;
      }
    );
  }

  //lorsqu'on appuie sur le bouton la requete necessitant le numero de ligne est envoy??
  executeForm() {
    this.getForecastFromLine(this.selectedOptionLine, this.selectedOptionMonth);
    this.getDayByMonth(this.selectedOptionMonth,this.selectedOptionLine);
  }

  //recupere les mois

  getMonthFromDb() {
    this.LineService.getMonthFromDb().subscribe(
      month => {
        this.monthNumber = month;
      });
  }

  getDayByMonth(monthValue: string,selectedOptionLine:number) {
    this.trackingService.getDayByMonth(this.vehicule_type, selectedOptionLine, monthValue).subscribe(
      dataTmp => {
        this.DataDayChart$ = dataTmp;
        //change le titre du graphique
        this.monthGraphTitle = 'Graphique repr??sentant la moyenne des retards pour le mois de '+monthValue;
        //definit les donn??es
        this.labelDay = this.DataDayChart$.map(dataTmp => dataTmp.dateObservation);
        this.dataDayCharset = [
          {
            data: this.DataDayChart$.map(data => data.count), label: 'Nombre de retards (r??els)'
          },
          {
            data: this.DataDayChart$.map(data => data.relativeHumidity), label: 'Nombre de retards (pr??dictions)'
          },
          {
            data: this.DataDayChart$.map(data => data.precip), label: 'Pr??cipitations pluies (mm)', yAxisID: 'y-axis-1', type: 'bar'
          }];
        this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
      });
  }

  //recupere les ann??es
  getYearsFromDb() {
    this.LineService.getYearsFromDb().subscribe(
      yearDb => {
        this.YearsNumber = yearDb;
      }
    );
  }

  //recupere les details de la m??t??o

  getDetailsWeather(dateValue: string) {
    this.LineService.getDetailsWeather(dateValue,this.vehicule_type).subscribe(
      tmpData => {
        this.weatherGraphTitle = 'Graphique repr??sentant les donn??es m??t??o de la journ??e du '+ dateValue;
        this.dataPieChart$ = tmpData;
        this.pieChartDataSet = [
          {
            data: [
              this.dataPieChart$.windSpeed
              ,this.dataPieChart$.snow
              , this.dataPieChart$.precip
              ,this.dataPieChart$.relativeHumidity
              , this.dataPieChart$.visibility
            ]
          }
        ];
      });
  }

  public chartClicked(e: any): void {
    console.log(this.labelLinear[e.active[0]._index]);
      this.showSpeficic=true;
  }

  changeYearsData(value: string) {
    this.getCountLineForGraph(value);
    this.getInfoForTable(value);
    this.GetInfoForMostDelay(value);
    this.years=value;
  }

  specificChartClicked(e:any) {
    //sthis.bool = true;
    this.getDetailsWeather(this.labelDay[e.active[0]._index]);

  }

  ChangeParam(param :number,type:number) {
    if(type==1) {
      switch (param) {
        case 1:
          this.dataChartSetHour = [
            {
              data: this.dataForecast$.map(data => data.delayForecast), label: 'Nombre de retards'
            },
            {
              data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast$.map(data => data.snow), label: 'Pr??cipitations neige (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 2:
          this.dataChartSetHour = [
            {
              data:this.dataForecast$.map(data => data.delayForecast), label: 'Nombre de retards'
            },
            {
              data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast$.map(data => data.precip), label: 'Pr??cipitations pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 3:
          this.dataChartSetHour = [
            {
              data: this.dataForecast$.map(data => data.delayForecast), label: 'Nombre de retards'
            },
            {
              data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast$.map(data => data.visibility), label: 'Niveau de visibilit?? (m)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 4:
          this.dataChartSetHour = [
            {
              data:  this.dataForecast$.map(data => data.delayForecast), label: 'Nombre de retards'
            },
            {
              data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (prediction)',yAxisID: 'y-axis-0', type: 'line'
            },
            {
              data: this.dataForecast$.map(data => data.windSpeed), label: 'Vitesse du vent (km/h)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataChartSetHour[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 5:
          this.dataChartSetHour = [
            {
              data:  this.dataForecast$.map(data => data.delayForecast), label: 'Nombre de retards',yAxisID: 'y-axis-0', type: 'bar'
            },
            {
              data: this.dataForecast$.map(data => data.prediction), label: 'Nombre de retards (pr??dictions)', yAxisID: 'y-axis-0', type: 'bar'
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
              data: this.DataDay = this.DataDayChart$.map(data => data.count), label: 'Nombre de retards'
            },
            {
              data: this.DataDayChart$.map(data => data.relativeHumidity), label: 'Nombre de retards (pr??dictions)'
            },
            {
              data: this.DataDayChart$.map(data => data.snow), label: 'Pr??cipitation neige (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 2:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart$.map(data => data.count), label: 'Nombre de retard'
            },
            {
              data: this.DataDayChart$.map(data => data.relativeHumidity), label: 'Nombre de retard (prediction)'
            },
            {
              data: this.DataDayChart$.map(data => data.precip), label: 'Pr??cipitations pluie (mm)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 3:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart$.map(data => data.count), label: 'Nombre de retards'
            },
            {
              data: this.DataDayChart$.map(data => data.relativeHumidity), label: 'Nombre de retards (predictions)'
            },
            {
              data: this.DataDayChart$.map(data => data.visibility), label: 'Niveau de visibilit?? (m)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
        case 4:
          this.dataDayCharset = [
            {
              data: this.DataDay = this.DataDayChart$.map(data => data.count), label: 'Nombre de retards'
            },
            {
              data: this.DataDayChart$.map(data => data.relativeHumidity), label: 'Nombre de retards (pr??dictions)'
            },
            {
              data: this.DataDayChart$.map(data => data.windSpeed), label: 'Vitesse du vent (km/h)', yAxisID: 'y-axis-1', type: 'bar'
            }];
          this.dataDayCharset[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
          break;
      }
    }
  }


}
