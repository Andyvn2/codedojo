import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { TableComponent } from './table/table.component';
import { WriteComponent } from './write/write.component';



const routes: Routes = [
  { path: 'movies', component: TableComponent},
  { path: 'movies/new',component: NewComponent },
  { path: 'movies/review/:id',component: WriteComponent },
  { path: 'movies/:id',component: ReviewComponent },
  { path: 'newreview/:id',component: WriteComponent },
  { path: '', pathMatch: 'full', redirectTo: '/movies'}

  // use a colon and parameter name to include a parameter in the url
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
