import { Component, OnInit } from '@angular/core';

import { BeerService, Beer } from '../beer.service';

@Component({
  selector: 'app-beer-component',
  templateUrl: './beer-component.component.html',
  styleUrls: ['./beer-component.component.css']
})
export class BeerComponentComponent implements OnInit {

  beers: Beer[];

  constructor(private beerService: BeerService) { this.getBeer(); }

  ngOnInit() {
  }

  getBeer()
  {
    this.beerService.getBeers().subscribe(
      data => {
        this.beers = data;
      },
      error => {
        alert('Could not retrieve a list of beers');
      }
    )
  }

}
