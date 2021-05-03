import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../_services/dashboard.service';
import { Chart } from 'chart.js';
import swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transaction: any = []
  transactions: any

  todaydate: any

  month: any = []
  graph
  constructor(public Service: DashboardService) { }

  ngOnInit() {

    this.getallcounts()
    this.linegraph()
  }


  //api for get all counts
  getallcounts() {
    this.Service.getallcount().subscribe((res )=> {
      var data = res.response

      this.transaction = data
      this.transactions = data.noOfDebitTransection


      this.todaydate = new Date();

      for (var j = 1; j <= 12; j++) {
        var count = 0
        for (var i = 0; i < this.transactions.length; i++) {
          if (this.transactions[i].months == j) {
            this.month.push(this.transactions[i].count)
            count = 1
          }

        }
        if (count == 0) {
          this.month.push(0)
        }
      }


    },error=>{
      swal.fire({
        icon: 'warning',
        text: "No internet connection plz connect to internet",
      })
    })

  }


  //THIRD GRAPH
  linegraph() {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'TRANSACTION DETAILS',

          data: this.month,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 2

        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



}
