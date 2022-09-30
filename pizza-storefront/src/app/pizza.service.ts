// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order, OrderSummary } from "./models";

import { firstValueFrom, Subject} from 'rxjs';
const URL_ORDER_CREATED = "api/order";

@Injectable()
export class PizzaService {

  onOrderCreated = new Subject<Order[]>();

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order: Order) { 

    const headers = new HttpHeaders()
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')

    return firstValueFrom(
      this.http.post<Response>(URL_ORDER_CREATED, order, { headers })
    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<OrderSummary[]> { 
    return firstValueFrom(
      this.http.get<OrderSummary[]>(`api/order/${email}/all`)
    )
  }

}
