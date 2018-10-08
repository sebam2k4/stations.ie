import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationsComponent } from './stations/stations.component';


//This is my case 
const routes: Routes = [
    {
        path: '',
        component: StationsComponent
    }
    // {
    //     path: 'about',
    //     component: AboutComponent
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }