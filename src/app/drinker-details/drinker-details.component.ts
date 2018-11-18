import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkersService, Drinker} from '../drinkers.service';
import { HttpResponse} from '@angular/common/http';
import { drinkerData, popularBeer, distributionByWeek, distributionByDates } from '../drinkers.service';

declare const Highcharts: any;

@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  drinkerName: string;
  drinkerDetails: Drinker[];
  drinkersData: drinkerData[];
  popularBeer: popularBeer[];
  //distributionByWeek: distributionByWeek[];
  //istributionByDates: distributionByDates[];


  constructor( 
    private drinkerService: DrinkersService,
    private route: ActivatedRoute 
  ) { 
    route.paramMap.subscribe((paramMap) => {
      this.drinkerName = paramMap.get('drinker');

      drinkerService.getTransaction(this.drinkerName).subscribe(
        data=>{
          this.drinkersData = data;
        },
        (error: HttpResponse<any>)=>{
          if (error.status ===404){
            alert('Drinker Not Found');
          } 
          else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on server. Check the browser console');
          }
        }
      );

      this.drinkerService.getBeer(this.drinkerName).subscribe(
        data =>{
          this.popularBeer = data;

          const beers = [];
          const counts = [];

          this.popularBeer.forEach(row => {
            beers.push(row.item);
            counts.push(row.c);
          });

          this.renderChart(beers,counts);
        },
        (error: HttpResponse<any>)=>{
          if (error.status ===404){
            alert('Drinker Not Found');
          } 
          else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on server. Check the browser console');
          }
        }
      );

      this.drinkerService.getSpendings(this.drinkerName).subscribe(
        data =>{
          // this.distributionByWeek = data;

          const week = [];
          const counts = [];

          data.forEach(row => {
            week.push(row.WeekDateRange);
            counts.push(row.BillsInWeek);
          });

          this.renderChart1(week, counts);
        },
        (error: HttpResponse<any>)=>{
          if (error.status ===404){
            alert('Dirnker Not Found');
          } 
          else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on server. Check the browser console');
          }
        }
      );

      this.drinkerService.getDates(this.drinkerName).subscribe(
        data =>{
          //this.distributionByDates = data;

          const date = [];
          const count = [];

          data.forEach(row => {
            date.push(row.trans_date);
            count.push(row.c)
          });

          this.renderChart2(date, count);
        },
        (error: HttpResponse<any>)=>{
          if (error.status ===404){
            alert('Dirnker Not Found');
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

  
  renderChart(beers: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular Beers Ordered'
      },
      xAxis: {
        categories: beers,
        title: {
          text: 'Beer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Numbers ordered'
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
  renderChart2(date: string[], count: number[]) {
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Spending by Different Dates'
      },
      xAxis: {
        categories: date,
        title: {
          text: 'Week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Spendings'
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
        data: count
      }]
    });
  }
    
    renderChart1(week: string[], counts: string[]) {
    Highcharts.chart('bargraph1', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Weekly Spending Different Bars'
      },
      xAxis: {
        categories: week,
        title: {
          text: 'Week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Spendings'
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
