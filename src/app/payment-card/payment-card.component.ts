import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HomepageService } from '../_services/homepage.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  
  constructor( public Service : HomepageService,private route: ActivatedRoute) { }
    amount: number;
    code: string
    show=false
    newamount :number;
    couponcode=false
    codepercentage
    token
    couponcodevalue
    userid
    auth
    card
    carddetail
    cardnumber=""
    cardexpiry=""
  ngOnInit() {

    this.userid=this.route.snapshot.paramMap.get('userid');
    this.auth=this.route.snapshot.paramMap.get('auth');
    this.card=this.route.snapshot.paramMap.get('cards');
console.log(this.userid)
console.log(this.auth)
console.log(this.card)

    this.amount=0
    this.codepercentage=""
    this.newamount=0
    this.code=""
    this.show=false
    this.couponcode=false
    this.token=""
this.carddetail=""
this.cardexpiry=""
this.cardnumber=""
    this.getdetailofcard()
    
    // const s = this.renderer2.createElement('script');
    // s.onload = this.loadNextScript.bind(this);
    // s.type = 'text/javascript';
    // s.src = 'https://www.convergepay.com/hosted-payments/buy_button_script/5254544d4653793251754b575467466867755744694141414158667472366d52'; // Defines someGlobalObject
    // s.text = ``;
    // this.renderer2.appendChild(this._document.body, s);
  }

  getdetailofcard()
  {
    this.Service.carddetailbyid(this.card).subscribe((res)=>{
      this.carddetail=res.response
      this.cardnumber=this.carddetail.cardNumber
      this.cardexpiry=this.carddetail.expiryDate


    },error=>{
      swal.fire({
        icon: 'warning',
        text: "card detail not available",
      })
    })
  }




  loadNextScript() {
    // const s = this.renderer2.createElement('script');
    // s.src = 'https://www.convergepay.com/hosted-payments/buy_button_script/5254544d4653793251754b575467466867755744694141414158667472366d52';
    // this.renderer2.appendChild(this._document.body, s);

    this.ngOnInit()
 }

 onSubmit() {
if(this.amount === 0 )
{
  swal.fire({
    icon: 'warning',
    text: "Please Enter Amount",
  })
  return
}
this.show=true
  if(this.couponcode)
  {
    console.log(this.couponcodevalue)
    let share=
    {
      "ssl_amount":this.newamount,
      "user_id":this.userid,
      "coupon_applied":true,
      "coupon_code":this.couponcodevalue,
      "ssl_card_number":this.cardnumber,
      "ssl_exp_date":this.cardexpiry
    }
  
console.log(this.newamount)
this.Service.generatetokenforcard(share).subscribe((res)=>{
console.log(res.response.body)
this.token=res.response.body
 window.open("https://api.convergepay.com/hosted-payments/?ssl_txn_auth_token="+this.token,"_self")

})

  }
  else
  {
  
    
    this.newamount=this.amount
    let share=
    {
      "ssl_amount":this.newamount,
      "userId":this.userid,
"coupon_applied":false,
"coupon_code":'',
"ssl_card_number":this.cardnumber,
"ssl_exp_date":this.cardexpiry
    }
  
  this.Service.generatetokenforcard(share).subscribe((res)=>{
    console.log(res.response.body)
    this.token=res.response.body
    window.open("https://api.convergepay.com/hosted-payments/?ssl_txn_auth_token="+this.token,"_self")
})


  }

   
 }


 checkcode()
 {
  if(this.amount === 0)
  {
    swal.fire({
      icon: 'warning',
      text: "Please Enter Amount",
    })
    return
  }

  this.show=true
  console.log(this.amount) 
  console.log(this.code)
  this.Service.coupuncode(this.amount,this.code).subscribe((res)=>{
    console.log(res)
   this.couponcode=true
   this.couponcodevalue=res.response.couponCode
   this.newamount=res.response.newAmount
 this.codepercentage=res.response.discount
 swal.fire({
  icon: 'success',
  text: "Token Applied",
})
   },error=>{
    swal.fire({
      icon: 'warning',
      text: "Envalid Token",
    })
  })

 }
}