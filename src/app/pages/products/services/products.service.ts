import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto } from 'src/app/core/interfaces/products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient ) { }

  getAllProducts(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>('products');
  }

  createProduct(product: ProductDto): Observable<ProductDto[]> {
    return this.httpClient.post<ProductDto[]>('products', product);
  }

  updateProduct(product: ProductDto): Observable<ProductDto[]> {
    return this.httpClient.put<ProductDto[]>('products', product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<ProductDto[]>(`products?id=${id}`);
  }

}
