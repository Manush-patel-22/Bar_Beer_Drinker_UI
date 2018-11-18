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

export interface top_drinkers{
  c: number;
  drinker: string;
}

export interface time_distribution{
  time: string;
  count: string;
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

  postBeer(model: any) {
    return this.http.post<Beer[]>('/api/post_beer', model);
  }

  delete_beer(beer: string){
    return this.http.delete<Beer[]>('/api/delete_beer/' + beer);
  }

  getBeer(beer: string)
  {
    return this.http.get<Beer>('api/beer/' + beer);
  }

  getPopularBar(beer: string)
  {
    return this.http.get<popular_bar[]>('api/popular_bar_for_beer/' + beer);
  }

  getBeerTimeDistribution(beer: string)
  {
    return this.http.get<time_distribution[]>('api/time_distribution_for_beer/' + beer);
  }

  getTopDrinkerForBeer(beer: string)
  {
    return this.http.get<top_drinkers[]>('api/top_drinker_for_beer/' + beer);
  }

}
