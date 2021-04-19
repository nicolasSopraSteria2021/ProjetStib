import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //attribut
  @Input() deviceXs : boolean;
  myDate : any;
  opened  = false;
  value_page: string;


  accueil_p ="Accueil";
  bus_p="Bus";
  metro_p= "Métro";
  tram_p="Tram";

  //constructor
  constructor() {

    this.myDate = new Date();
    this.value_page = this.accueil_p;
  }

  //methode qui change la valeur de la navigation
  changeAccueil():void{
    this.value_page = this.accueil_p;
  }
  changeBus():void{
    this.value_page = this.bus_p;
  }

  ngOnInit(): void {

  }

}
