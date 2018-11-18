import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BarComponentComponent } from './bar-component/bar-component.component';
import { DrinkerComponent } from './drinker/drinker.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
