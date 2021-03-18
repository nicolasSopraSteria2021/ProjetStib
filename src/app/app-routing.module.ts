import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetroComponent} from './View/vehicule/metro/metro.component';
import {BusComponent} from './View/vehicule/bus/bus.component';
import {TramComponent} from './View/vehicule/tram/tram.component';
import {TableInfComponent} from './View/TableInformation/table-inf/table-inf.component';
import {AccueilComponent} from './View/commons/accueil/accueil.component';

const routes : Routes = [
  {
    path: 'Bus',
    component: BusComponent
  },
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'Metro',
    component: MetroComponent
  },
  {
    path: 'Tram',
    component: TramComponent
  },
  {
    path: 'TableInfo',
    component: TableInfComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule {

}
