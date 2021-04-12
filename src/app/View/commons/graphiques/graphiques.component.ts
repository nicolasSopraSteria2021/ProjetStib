import { Component, Input, OnInit} from '@angular/core';


import {LineService} from '../../../modele/lines/repository/line.service';
import {Line} from '../../../modele/lines/types/line';
import {TrackingVehiculeForTable} from '../../../modele/TrackingVehicule/types/tracking-vehicule-for-table';
import {MatTableDataSource} from '@angular/material/table';
import {TrackingVehiculeService} from '../../../modele/TrackingVehicule/repository/tracking-vehicule.service';
import {InfoMostDelay} from '../../../modele/TrackingVehicule/types/info-most-delay';
import { ChartOptions, ChartType } from 'chart.js';
import {LineForecast} from '../../../modele/lines/types/line-forecast';


@Component({
  selector: 'app-graphiques',
  templateUrl: './graphiques.component.html',
  styleUrls: ['./graphiques.component.css']
})
export class GraphiquesComponent implements OnInit{
  //static variable
  years : any = 2021;

  //Attribut
  @Input() vehicule_type : string ;
  lines: Line[]=[];
  NumberOfLine : any =[];
  dataForecast : LineForecast[]= [];
  dataForTables : TrackingVehiculeForTable[]=[];
  trackingLine : InfoMostDelay;

   monthNumber: number;
   YearsNumber: string;

  //titre des tableaux
  displayedColumns: string[] = ['count','dateObs'];
  displayedColumnsLineChart:string [] =  ['Heure','Retards'];

  //data source pour les tableaux
  dataSource: MatTableDataSource<TrackingVehiculeForTable>;
  dataSourceLine: MatTableDataSource<LineForecast>;

  //attribut pour le barchart
  LineNumberForChart : any = [];
  CountDelayForChart : any = [];
  // barchart set
  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  selectedOptionLine: any;
  selectedOptionMonth : any;

//constructor et ngOnInit


  constructor(private LineService : LineService,private trackingService : TrackingVehiculeService) {

  }

  ngOnInit(): void {
    this.getYearsFromDb();
    this.getMonthFromDb();
    this.getCountLineForGraph(this.years);
    this.getLineFromCategory();
    this.getInfoForTable(this.years);
    this.GetInfoForMostDelay(this.years);
    this.getForecastFromLine(12,12);
  }
//methode
  //recupere les previsions des retards en fonction de la ligne donnée
  getForecastFromLine(selectedOptionLine : any, selectedOptionMonth){
    this.LineService.getForecastFromLine(selectedOptionLine,this.vehicule_type,selectedOptionMonth).subscribe(forecast => {
      this.dataForecast =forecast;
      this.dataSourceLine = new MatTableDataSource<LineForecast>(this.dataForecast);
    });
  }
  //recupere les infos de la ligne la plus en retards
  GetInfoForMostDelay(value: any) {
  this.trackingService.GetInfoForMostDelay(this.vehicule_type,value).subscribe(data => this.trackingLine =data);
  }

  getInfoForTable(value: any){
    this.trackingService.getInfoForTable(this.vehicule_type,value).subscribe(dataTmp => {this.dataForTables = dataTmp;
      this.dataSource = new MatTableDataSource<TrackingVehiculeForTable>(this.dataForTables)
    });
  }
  //recupere les le numero des lignes et le nombre de retards pour le barchart
  getCountLineForGraph(value: any) {
    this.LineService.getLineChart(this.vehicule_type,value).subscribe(
      TmpLines=>
      {
        this.lines=TmpLines;
        this.CountDelayForChart = this.lines.map(line=>line.numberOfDelay);
        this.LineNumberForChart = this.lines.map(line=>"line n°"+line.lineNumber + "-"+line.countStopName +"arrets");
       // this.countStopName = this.lines.map(line=>line.numberOfDelay/line.countStopName);
      });
    }
  //recupere toutes lignes
  getLineFromCategory() {
      this.LineService.getLineNumberFromCategory(this.vehicule_type).subscribe
      (
        numberOfLine=>
        {
          this.NumberOfLine=numberOfLine;
        }
      );
  }
  //lorsqu'on appuie sur le bouton la requete necessitant le numero de ligne est envoyé
  executeForm() {
    this.getForecastFromLine(this.selectedOptionLine,this.selectedOptionMonth);
  }

  //recupere les mois

  getMonthFromDb(){
    this.LineService.getMonthFromDb().subscribe(
      month=>
      {
        this.monthNumber=month;
      }
    );
  }

  //recupere les années

  getYearsFromDb(){
    this.LineService.getYearsFromDb().subscribe(
      yearDb=>
      {
        this.YearsNumber=yearDb;
      }
    );
  }

  changeYearsData(value: string) {
    this.getCountLineForGraph(value);
    this.getInfoForTable(value);
    this.GetInfoForMostDelay(value);
  }
}
