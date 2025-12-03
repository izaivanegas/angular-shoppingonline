import { Component, computed} from '@angular/core';
import { CartService} from '../../services/cart.service';
import { CartItemCardComponent} from './components/cart-item-card/cart-item-card.component';
import { HttpClient } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemCardComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
count = computed(()=>this.cartService.cart().count);
total = computed(()=>this.cartService.cart().total);
items = computed(()=> this.cartService.cart().items)
constructor(private cartService: CartService, private http: HttpClient){}

 onItemQuantityUpdate(quantity: number, id: string){
    let increase = true;
    const item = this.items().find((t)=> t.id === id);
    if(quantity < item!.quantity){
      increase = false;
    }
    if(increase){
      this.cartService.increaseItem(item!);
    }else{
      this.cartService.decreaseItem(item!);
    }
 }
 onRemoveItem(id: string){
    const item = this.items().find((t)=> t.id === id);
    this.cartService.removeItem(item!);
 }
  async onCheckout() {
    console.log('Esta pasando por aqui!!!!!!!!!!!');

    const body = this.cartService.cart().items;
    const headers = { 'Content-Type': 'application/json' };

    this.http.post('http://localhost:8000/api/create-checkout-session', body, { headers })
      .subscribe({
        next: (response: any) => {
          const url = response?.url;
          if (url) {
            // redirige directamente a la URL de sesión (nuevo flujo)
            window.location.href = url;
          } else {
            console.error('No session URL returned', response);
          }
        },
        error: (err) => {
          console.error('Error creating checkout session', err?.error || err);
        }
      });
  }
/*
 async onCheckout(){
  console.log("Esta pasando por aqui!!!!!!!!!!!")
  const stripe = await loadStripe(environment.STRIPE_PK);
  const body = this.cartService.cart().items;
  const headers = {'Content-type':'application/json',};
  this.http.post('http://localhost:8000/api/create-checkout-session',body,{headers:headers,})
    .subscribe({
      next: async (response)=>{
        const session = response as any;
        const result = await (stripe as any)?.redirectToCheckout({
            sessionId: session.id,
        });
        if(result?.error){
          console.log(result?.error);
        }
      },
      error: (response)=>{
        if(response?.error){
          console.log(response?.error);
        }
      },
    });

 }*/

}
