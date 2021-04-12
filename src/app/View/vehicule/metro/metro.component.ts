import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.component.html',
  styleUrls: ['./metro.component.css']
})
export class MetroComponent implements OnInit {

  vehicule_type : string ="Metro";
  constructor() { }

  ngOnInit(): void {
  }

}
