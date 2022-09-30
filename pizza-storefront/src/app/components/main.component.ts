import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  order!: Order

  orderForm!: FormGroup

  toppingsArray!: FormArray

  pizzaToppings = PizzaToppings

  pizzaSize = SIZES[0]

  email!:string

  orderList!: OrderSummary[]


  constructor(private fb: FormBuilder, private pizzaSvc: PizzaService, 
    private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.createOrder()
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
    console.info('>>>> pizzaSize selected is:', this.pizzaSize)
  }

  


  createOrder(){
    this.toppingsArray = this.fb.array(
      this.pizzaToppings.map(() => this.fb.control(''))
    )   
    this.orderForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required]),
      pizzaSize: this.fb.control<string>(this.pizzaSize,Validators.required),
      base: this.fb.control<boolean>(this.order?.base, Validators.required),
      sauce: this.fb.control<string>('', Validators.required),
      toppings: this.toppingsArray,
      comments: this.fb.control<string>('')
    })
  }

  orderCreated(){
    console.info('Place order button clicked')
    const order: Order = this.orderForm.value as Order
    const email = this.activatedRoute.snapshot.params['email']
    this.pizzaSvc.createOrder(order)
          .then(result => {
            console.info('>>>>> result: ', result)
            this.router.navigate(['/orders', email])
          }).catch((error: HttpErrorResponse) => {
            console.error('>>>> error: ', error)
          })
  }

  showOrders(){
    console.info('List button clicked')
    const orderSummary: OrderSummary = this.orderForm.value as OrderSummary
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
