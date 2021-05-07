import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetroComponent} from './View/vehicule/metro/metro.component';
import {BusComponent} from './View/vehicule/bus/bus.component';
import {TramComponent} from './View/vehicule/tram/tram.component';
import {ConnectionComponent} from './View/connection/connection.component';

const routes : Routes = [
  {
    path:'',
    component : ConnectionComponent
  },
  {
    path: 'Bus',
    component: BusComponent
  },
  {
    path: 'Metro',
    component: MetroComponent
  },
  {
    path: 'Tram',
    component: TramComponent
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
