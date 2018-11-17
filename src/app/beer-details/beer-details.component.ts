import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { Beer, popular_bar, time_distribution, BeerService, top_drinkers} from '../beer.service';

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
  topDrinkers: top_drinkers[];
  time_distribution: time_distribution[];


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
  
            this.renderChartPopularBar(bars, counts);
            
          },
          (error: HttpResponse<any>)=>{
            if (error.status ===404){
              alert('Beer Not Found');
            } 
            else {
              console.error(error.status + ' - ' + error.body);
              alert('An error occured on server. Check the browser console');
            }
          }
        );

        this.BeerService.getTopDrinkerForBeer(this.beerName).subscribe(
          data =>{
            this.topDrinkers = data;
  
            const drinkers = [];
            const counts = [];
  
            this.topDrinkers.forEach(row => {
              drinkers.push(row.drinker);
              counts.push(row.c);
            });
  
            this.renderChartTopDrinkers(drinkers, counts);
            
          },
          (error: HttpResponse<any>)=>{
            if (error.status ===404){
              alert('Beer Not Found');
            } 
            else {
              console.error(error.status + ' - ' + error.body);
              alert('An error occured on server. Check the browser console');
            }
          }
        );

        this.BeerService.getBeerTimeDistribution(this.beerName).subscribe(
          data => {
            this.time_distribution = data;
  
            const count = [];
            const time = [];
  
            this.time_distribution.forEach(row => {
              count.push(row.count);
              time.push(row.time);
            });
  
            this.renderChartTimeDistribution(time, count);
          },
          (error: HttpResponse<any>)=>{
            if (error.status ===404){
              alert('Beer Not Found');
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

  renderChartPopularBar(bars: string[], counts: number[]) {
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

  renderChartTopDrinkers(drinkers: string[], counts: number[]) {
    Highcharts.chart('drinkersgraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular drinkers for this beer'
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: 'Bar'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Numbers bought'
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

  renderChartTimeDistribution(bars: string[], counts: number[]) {
    Highcharts.chart('beerTimegraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Time Distribution for Sale'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Time Slots'
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
