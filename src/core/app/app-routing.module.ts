import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsViewComponent } from 'src/modules/stations/stations-view.component';


// This is my case
const routes: Routes = [
    {
      path: '',
      component: StationsViewComponent
    },
    {
      path: '**',
      component: StationsViewComponent,
      redirectTo: ''
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
