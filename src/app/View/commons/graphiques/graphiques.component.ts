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
  //Attribut
  @Input() vehicule_type : number ;
  lines: Line[]=[];
  NumberOfLine : any =[];
  dataForecast : LineForecast[]= [];
  dataForTables : TrackingVehiculeForTable[]=[];
  trackingLine : InfoMostDelay;

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
  selectedOption: any;

//constructor et ngOnInit
  constructor(private LineService : LineService,private trackingService : TrackingVehiculeService) {

  }

  ngOnInit(): void {
    this.getCountLineForGraph();
    this.getLineFromCategory();
    this.getInfoForTable();
    this.GetInfoForMostDelay();
  }
//methode
  //recupere les previsions des retards en fonction de la ligne donnée
  getForecastFromLine(selectedOption : any){
    this.LineService.getForecastFromLine(selectedOption).subscribe(forecast => {
      this.dataForecast =forecast;
      this.dataSourceLine = new MatTableDataSource<LineForecast>(this.dataForecast);
    });
  }
  //recupere les infos de la ligne la plus en retards
  GetInfoForMostDelay()
  {
    this.trackingService.GetInfoForMostDelay(this.vehicule_type).subscribe(data => this.trackingLine =data);
  }
  getInfoForTable(){
    this.trackingService.getInfoForTable(this.vehicule_type).subscribe(dataTmp => {this.dataForTables = dataTmp;
      this.dataSource = new MatTableDataSource<TrackingVehiculeForTable>(this.dataForTables)
    });
  }
  //recupere les le numero des lignes et le nombre de retards pour le barchart
  getCountLineForGraph()
  {
    this.LineService.getLineChart(this.vehicule_type).subscribe(
      TmpLines=>
      {
        this.lines=TmpLines;
        this.CountDelayForChart = this.lines.map(line=>line.numberOfDelay);
        this.LineNumberForChart = this.lines.map(line=>line.lineNumber);
      });
    }
  //recupere toutes lignes
  getLineFromCategory()
  {
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
    this.getForecastFromLine(this.selectedOption);
  }
}
