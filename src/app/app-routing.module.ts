import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BarComponentComponent } from './bar-component/bar-component.component';
import { DrinkerComponent } from './drinker/drinker.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { BeerComponentComponent } from './beer-component/beer-component.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

const routes: Routes = [
  {
    path: 'static',
    pathMatch: 'full',
    redirectTo: 'bars'
  },
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
   
  },
  {
    path: 'bars',
    pathMatch: 'full',
    component: BarComponentComponent
  },
  {
    path: 'bars/:bar',
    pathMatch: 'full',
    component: BarDetailsComponent
  },
  {
    path: 'drinkers',
    pathMatch: 'full',
    component: DrinkerComponent
  },
  {
    path: 'drinkers/:drinker',
    pathMatch: 'full',
    component: DrinkerDetailsComponent
  },
  {
    path: 'beers',
    pathMatch: 'full',
    component: BeerComponentComponent
  },
  {
    path: 'beers/:beer',
    pathMatch: 'full',
    component: BeerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
