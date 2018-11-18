import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BarComponentComponent } from './bar-component/bar-component.component';
import { DrinkerComponent } from './drinker/drinker.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BeerComponentComponent } from './beer-component/beer-component.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BarDetailsComponent,
    BarComponentComponent,
    DrinkerComponent,
    DrinkerDetailsComponent,
    BeerComponentComponent,
    BeerDetailsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
