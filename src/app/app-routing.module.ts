import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetroComponent} from './View/vehicule/metro/metro.component';
import {BusComponent} from './View/vehicule/bus/bus.component';
import {TramComponent} from './View/vehicule/tram/tram.component';



const routes : Routes = [
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
