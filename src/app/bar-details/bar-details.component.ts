import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService , Bar, popularBar, topSpender, topManf, DistributionByWeek } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  popularBar: popularBar[];
  topSpender: topSpender[];
  topManf: topManf[];

  // beers: string[];
  // counts: number[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data=>{
          this.barDetails = data;
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

      this.barService.getPopular(this.barName).subscribe(
        data =>{
          this.popularBar = data;

          const beers = [];
          const counts = [];

          this.popularBar.forEach(row => {
            beers.push(row.item);
            counts.push(row.c);
          });

          this.renderChart1(beers, counts);
          
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

      this.barService.getSpender(this.barName).subscribe(
        data =>{
          this.topSpender = data;

          const drinkerList = [];
          const spent = [];

          this.topSpender.forEach(row => {
            drinkerList.push(row.drinker);
            spent.push(row.total);
          });

          this.renderChart2(drinkerList, spent);
          
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

      this.barService.getManufacture(this.barName).subscribe(
        data =>{
          this.topManf = data;

          const manufacture = [];
          const beers = [];

          this.topManf.forEach(row => {
            manufacture.push(row.manf);
            beers.push(row.c);
          });

          this.renderChart3(manufacture, beers);
          
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

      this.barService.getPeakTimesForDay(this.barName).subscribe(
        data => {

          const time = [];
          const counts = [];

          data.forEach(row => {
            time.push(row.time);
            counts.push(row.count);
          });

          console.log(time)
          console.log(counts)

          this.renderChart4(time, counts);
        }
      );

      this.barService.getDistributionByWeek(this.barName).subscribe(
        data =>{

          const week = [];
          const counts = [];

          data.forEach(row => {
            week.push(row.WeekDateRange);
            counts.push(row.BillsInWeek);
          });

          this.renderChart5(week, counts);
          
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

  renderChart1(beers: string[], counts: number[]) {
    Highcharts.chart('bargraph1', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular Beers at Bar'
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

  renderChart2(drinkerList: string[], spent: number[]) {
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Drinkers Who Are Large Spenders'
      },
      xAxis: {
        categories: drinkerList,
        title: {
          text: 'Drinker'
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
        data: spent
      }]
    });
  }

  renderChart3(manufacture: string[], beers: string[]) {
    Highcharts.chart('bargraph3', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Manufacture who sell the most beers'
      },
      xAxis: {
        categories: manufacture,
        title: {
          text: 'Manufacture'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Beers'
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
        data: beers
      }]
    });
  }

  renderChart4(times: string[], counts: number[]) {
    Highcharts.chart('bargraph4', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular times at Bar'
      },
      xAxis: {
        categories: times,
        title: {
          text: 'Beer'
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

  renderChart5(week: string[], counts: string[]) {
    Highcharts.chart('bargraph5', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Busiest Period of the Week'
      },
      xAxis: {
        categories: week,
        title: {
          text: 'week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'counts'
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
