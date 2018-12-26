import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//This is my case 
const routes: Routes = [
    {
        path: '',
        loadChildren: '../../modules/stations/stations.module#StationsModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }