import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
@Component({
  selector: 'app-testing2',
  templateUrl: './testing2.component.html',
  styleUrls: ['./testing2.component.css']
})
export class Testing2Component implements OnInit {
  playerName
  constructor() { }

  ngOnInit() {
    this.playerName=''
  }
  onSubmit() {
    if(this.playerName === 0 )
    {
      swal.fire({
        icon: 'warning',
        text: "Please Enter Amount",
      })
      return
    }
     window.open("https://api.convergepay.com/hosted-payments/?ssl_txn_auth_token="+this.playerName)
  }
}
