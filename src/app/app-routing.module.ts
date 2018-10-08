import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationsComponent } from './stations/stations.component';
import { PrivacyComponent } from './privacy/privacy.component';


//This is my case 
const routes: Routes = [
    {
        path: '',
        component: StationsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }