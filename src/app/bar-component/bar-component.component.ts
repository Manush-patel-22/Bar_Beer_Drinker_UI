import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BarsService, Bar} from '../bars.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-bar-component',
  templateUrl: './bar-component.component.html',
  styleUrls: ['./bar-component.component.css']
})

export class BarComponentComponent implements OnInit {

  model: any = {};

  @ViewChild('f') barfrom: NgForm;

  bars: Bar[];
  barName: string;

  newBar: Bar;

  constructor(public barService: BarsService, private toastr: ToastrService){
      this.getBars();
    }


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.barService.postBar(this.model).subscribe(
      data => {
        console.log(data);
        this.getBars();
      },
      error => {
        console.log("nah");
      }
    );
  }

  showForDelete(name: string){
    if (confirm('Are you sure you want to delete this bar ?') == true){
      this.barService.delete_bar(name).subscribe(
        data => {
          this.barService.getBars();
        })

    }
  }

  showForEdit( bar: Bar){

  }

  getBars(){
    this.barService.getBars().subscribe(
      data => {
        this.bars = data;
      },
      error => {
        alert('Couldnt retrieve the list of bars');
      }
    );
  }

}
