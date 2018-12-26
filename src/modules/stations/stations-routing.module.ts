import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationsViewComponent } from './stations-view/stations-view.component';


//This is my case 
const routes: Routes = [
    {
        path: '',
        component: StationsViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }