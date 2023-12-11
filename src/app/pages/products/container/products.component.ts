import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss']
})
export class ProductsComponent {
  products: any = []
  headers = [
    { id: 'logo', name: 'Logo', type: 'image', image: true},
    { id: 'name', name: 'Nombre del producto', type: 'text'},
    { id: 'description', name: 'Descripción', type: 'text'},
    { id: 'date_release', name: 'Fecha de liberación', type: 'date'},
    { id: 'date_revision', name: 'Fecha de reestructuración', type: 'date'},
    { id: '', name: 'Acciones', type: 'action'},
   ]
   qty: number = 0;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe(prod => {
      this.products = prod;
      this.qty = this.products.length;
    })
  }
}
