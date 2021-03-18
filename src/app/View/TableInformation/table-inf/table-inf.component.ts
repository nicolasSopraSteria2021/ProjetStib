import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Vehicule, VehiculesList} from '../../../modele/vehicule/types/vehicule';
import {VehiculeService} from '../../../modele/vehicule/repository/vehicule.service';
import {CategoriesList} from '../../../modele/categories/types/category';
import {CategoryServiceService} from '../../../modele/categories/repository/category-service.service';


@Component({
  selector: 'app-table-inf',
  templateUrl: './table-inf.component.html',
  styleUrls: ['./table-inf.component.css']
})
export class TableInfComponent implements OnInit {
  //dataSource pour le tableau
  dataSource: MatTableDataSource<Vehicule>;
  //liste des vehicules pour le tableau
  VehiculeList : VehiculesList;
  //permet de recuperer les categories pour le select
  categories: CategoriesList=[];
  //titre du tableau
  displayedColumns: string[] = ['idveh','category', 'LineNumber','Station_departure', 'Station_Arrival','Hour_departure','Hour_arrival'];


  constructor(private vehiculeService : VehiculeService,private CategoryService : CategoryServiceService) {}

  ngOnInit(): void{
    this.getCategory();
    this.getVehicule();
    console.log(this.VehiculeList);
  }
//recupere tous les vehicules de la base de données
  getVehicule(){
    this.vehiculeService.query().subscribe(Tmpvehs=>{
      this.VehiculeList = Tmpvehs
      //attribution de la liste a la dataSource du tableau
      this.dataSource = new MatTableDataSource<Vehicule>(this.VehiculeList);
    });
  }
  //recupere les categories
  getCategory(){
    this.CategoryService.query().subscribe(categories=>{this.categories = categories;});
  }
  //filtre pour le tableau
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }



}
