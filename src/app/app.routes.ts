import { Routes } from '@angular/router';
import { CarTableComponent } from './car-table/car-table.component';
import { CarRentalComponent } from './car-rental/car-rental.component';



export const routes: Routes = [ // Add `export` keyword
  { path: '', component: CarTableComponent, pathMatch: 'full' },
  { path: 'rent/:id', component: CarRentalComponent }

  
];
