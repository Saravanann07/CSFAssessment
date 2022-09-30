import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input()
  orderList!: OrderSummary[]

  email!:string

  constructor(private pizzaSvc: PizzaService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email']
    this.pizzaSvc.getOrders(this.email)
        .then(result => {
          this.orderList = result
          console.info('>>>> orders retrived', this.orderList)
          this.router.navigate(['/orders', this.email])
        } ).catch(error => {
          console.info('Error in retrieving orderlist')
        })
  }

}
