import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../data/products.data'
import { TruncatePipe } from '../../../../pipes/truncate.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
  onAdd(product: Product){
   //this.add.next(this.product);    
   console.log('✅ ProductCard - Botón clickeado');
  console.log('Producto:', product);
   this.add.emit(this.product)
  }
  
}
