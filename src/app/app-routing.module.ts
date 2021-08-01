import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

// Defining some routes/URLs that will be used
const routes: Routes = [
  // For each route, the path is the URL and the component is what the URL points to
  {
    path: '',
    component: HomeComponent,
  },
  {
    // Branch off to different games
    path: 'search/:game-search',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
