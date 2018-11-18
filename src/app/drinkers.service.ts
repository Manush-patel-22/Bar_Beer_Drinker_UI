import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
``

export interface Drinker{
  city: string;
  name: string;
  phone: string;
  addr: string;
}

export interface drinkerData{
  ID: string;
  bar: string;
  trans_time: string;
  trans_date: string;
  totalAmount: number;  
}

export interface distributionByWeek{
  totalBills: number;
  weekDateRange: string;
}

export interface distributionByDates{
  count: number;
  transDate: string;
}

export interface popularBeer{
  c: number;
  item: string;
}


@Injectable({
  providedIn: 'root'
})
export class DrinkersService {

  constructor(public http: HttpClient) { 

  }

  getDrinkers(){
    return this.http.get<Drinker[]>('/api/drinkers');
  }

  getDrinker(drinker: string){
    return this.http.get<Drinker>('api/drinkers/' + drinker);
  }

  postDrinker(model: any) {
    return this.http.post<Drinker[]>('/api/post_drinker', model);
  };

  delete_drinker(drinker: string){
    return this.http.delete<Drinker[]>('/api/delete_drinker/' + drinker);
  }

  getTransaction(drinker: string){
    return this.http.get<drinkerData[]>('api/drinker_transaction/' + drinker);
  }

  getBeer(drinker: string){
    return this.http.get<popularBeer[]>('api/most_ordered_beer/' + drinker);
  }

  getSpendings(drinker: string){
    return this.http.get<any[]>('api/spending_different_weeks/' + drinker);
  }

  getDates(drinker: string){
    return this.http.get<any[]>('api/spending_different_dates/' + drinker);
  }

}
