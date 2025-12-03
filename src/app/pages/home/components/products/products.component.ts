import { Component, OnInit } from '@angular/core';
import { PRODUCTS, Product } from '../../../../data/products.data';
import { ProductCardComponent}  from '../product-card/product-card.component';
import { CartService } from '../../../../services/cart.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = PRODUCTS;  
  constructor(private cartService: CartService) {}
   

  // Método que captura el evento del hijo
  onAdd(product: Product) {
     console.log('✅ Products - Evento capturado');
  console.log('Agregando al carrito:', product.name);
    this.cartService.addItem({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
  }
}
