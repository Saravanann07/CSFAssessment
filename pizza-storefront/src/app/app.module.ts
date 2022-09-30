import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//1 
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { PizzaService } from './pizza.service';
import { OrdersComponent } from './components/orders.component';

//2 
const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'orders/:email', component: OrdersComponent},

  //catch all
  { path: '**', redirectTo: '/', pathMatch: 'full'}

]


@NgModule({
  declarations: [
    AppComponent, MainComponent, OrdersComponent
  ],
  //3
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],

  providers: [ PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
