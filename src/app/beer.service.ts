import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Beer {
  name: string;
  manf: string;
}

export interface popular_bar{
  c: number;
  bar: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(
    public http: HttpClient
  ) { }

  getBeers()
  {
    return this.http.get<Beer[]>('/api/beers');
  }

  getBeer(beer: string)
  {
    return this.http.get<Beer>('api/beer/' + beer);
  }

  getPopularBar(beer: string)
  {
    return this.http.get<popular_bar[]>('api/popular_bar_for_beer/' + beer);
  }

}
