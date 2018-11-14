import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { Beer, popular_bar, BeerService} from '../beer.service';

declare const Highcharts: any;

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {


  beerName: string;
  beerDetails: Beer;
  popularBar: popular_bar[];


  constructor(private BeerService: BeerService,
    private route: ActivatedRoute) 
    { 
      route.paramMap.subscribe((paramMap) => {
        this.beerName = paramMap.get('beer');
  
        BeerService.getBeer(this.beerName).subscribe(
          data=>{
            this.beerDetails = data;
          },
          (error: HttpResponse<any>)=>{
            if (error.status ===404){
              alert('Bar Not Found');
            } 
            else {
              console.error(error.status + ' - ' + error.body);
              alert('An error occured on server. Check the browser console');
            }
          }
        );
  
        this.BeerService.getPopularBar(this.beerName).subscribe(
          data =>{
            this.popularBar = data;
  
            const bars = [];
            const counts = [];
  
            this.popularBar.forEach(row => {
              bars.push(row.bar);
              counts.push(row.c);
            });

            console.log(bars);
  
            this.renderChart(bars, counts);
            
          },
          (error: HttpResponse<any>)=>{
            if (error.status ===404){
              alert('Bar Not Found');
            } 
            else {
              console.error(error.status + ' - ' + error.body);
              alert('An error occured on server. Check the browser console');
            }
          }
        );
      });
    }

  ngOnInit() {

  }

  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('beergraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular bars for this beer'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Bar'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Numbers Sold'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }

}
