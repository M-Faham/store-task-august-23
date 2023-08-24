import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }


  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('https://fakestoreapi.com/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`https://fakestoreapi.com/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`https://fakestoreapi.com/products/${id}`);
  }
}
