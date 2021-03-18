import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tram',
  templateUrl: './tram.component.html',
  styleUrls: ['./tram.component.css']
})
export class TramComponent implements OnInit {

  vehicule_type : number = 2;
  constructor() { }

  ngOnInit(): void {
  }

}
