import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
``
export interface Bar{
  name: string;
  license: string;
  city: string;
  phone: string;
  addr: string;
  OpenTime: string;
  CloseTime: string;
}

export interface DistributionByWeek{
  totalBills: number;
  weekDateRange: string;
}

export interface popularBar{
  c: number;
  item: string;
}

export interface topSpender{
  total: number;
  drinker: string;
}

export interface topManf{
  manf: string;
  item: string;
  c: number;
}

export interface BarMenuItem {
  beer: string;
  manf: string;
  price: number;

}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars(){
    return this.http.get<Bar[]>('/api/bar');
  }

  postBar(model: any) {
    return this.http.post<Bar[]>('/api/post_bar', model);
  };

  delete_bar(bar: string){
    return this.http.delete<Bar[]>('/api/delete_bar/' + bar);
  }

  getBar(bar: string){
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string){
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getPopular(bar: string){
    return this.http.get<popularBar[]>('/api/most_popular/' + bar);
  }

  getSpender(bar: string){
    return this.http.get<topSpender[]>('/api/drinkers_largest_spender/' + bar);
  }

  getManufacture(bar: string){
    return this.http.get<topManf[]>('/api/sell_most_beer/' + bar);
  }

  getPeakTimesForDay(bar: string)
  {
    return this.http.get<any[]>('/api/transaction_peak_times_day/' + bar);
  }

  getDistributionByWeek(bar: string)
  {
    return this.http.get<any[]>('/api/distribution_by_week/' + bar);
  }
}
