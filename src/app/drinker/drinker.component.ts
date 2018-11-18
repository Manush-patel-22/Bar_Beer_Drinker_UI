import { Component, OnInit, ViewChild } from '@angular/core';
import { Drinker, DrinkersService } from '../drinkers.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-drinker',
  templateUrl: './drinker.component.html',
  styleUrls: ['./drinker.component.css']
})
export class DrinkerComponent implements OnInit {

  drinkers: Drinker[];
  model: any = {};
  @ViewChild('f') barfrom: NgForm;
  drinker: Drinker[];

  constructor(public drinkersService: DrinkersService) { 
    this.getDrinkers();
  }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    this.drinkersService.postDrinker(this.model).subscribe(
      data => {
        console.log(data);
        this.getDrinkers();
       
      }
    );
  }

  showForDelete(name: string){
    if (confirm('Are you sure you want to delete this drinker ?') == true){
      this.drinkersService.delete_drinker(name).subscribe(
        data => {
          this.drinkersService.getDrinkers();
        });
    }
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
