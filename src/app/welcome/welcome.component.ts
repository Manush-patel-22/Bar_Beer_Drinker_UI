import { Component, OnInit } from '@angular/core';

import { BeerService, Beer } from '../beer.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.getBeer();
  }

}
