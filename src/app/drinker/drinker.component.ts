import { Component, OnInit } from '@angular/core';
import { Drinker, DrinkersService } from '../drinkers.service'

@Component({
  selector: 'app-drinker',
  templateUrl: './drinker.component.html',
  styleUrls: ['./drinker.component.css']
})
export class DrinkerComponent implements OnInit {

  drinkers: Drinker[];

  constructor(public drinkersService: DrinkersService) { 
    this.getDrinkers();
  }

  ngOnInit() {
    
  }

  getDrinkers(){
    this.drinkersService.getDrinkers().subscribe(
      data => {
        this.drinkers = data;

      },
      error => {
        alert('could not retrieve a list of drinkers')
      }
    );
  }

}
