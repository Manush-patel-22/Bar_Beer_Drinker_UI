import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BeerService, Beer } from '../beer.service';

@Component({
  selector: 'app-beer-component',
  templateUrl: './beer-component.component.html',
  styleUrls: ['./beer-component.component.css']
})
export class BeerComponentComponent implements OnInit {

  model: any = {};
  @ViewChild('f') beerFrom: NgForm;

  beers: Beer[];
  beerName: string;
  newBeer: Beer;

  constructor(private beerService: BeerService) { this.getBeer(); }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.beerService.postBeer(this.model).subscribe(
      data => {
        console.log(data);
        this.getBeer();
      }
    );
  }

  showForDelete(name: string){
    if (confirm('Are you sure you want to delete this beer ?') == true){
      this.beerService.delete_beer(name).subscribe(
        data => {
          this.beerService.getBeers();
        })
    } 
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
