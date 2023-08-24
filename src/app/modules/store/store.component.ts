import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Product, ProductsService } from 'src/@api';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, NgIf, MatButtonModule, MatIconModule, NgForOf]
})
export class StoreComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];

  constructor(
    protected _t: Title,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar,
  ) {
    _t.setTitle('Store');
  }

  ngOnInit() {
    this.getProductList();
  }



  getProductList() {
    this._getProducts(this.productsService.getProducts());
  }


  public getProductsByCategory(category: string) {
    this._getProducts(this.productsService.getProductsByCategory(category));
  }

  public searchProducts(searchTerm: string) {
    this.filteredProducts = this.products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }


  private _getProducts(products: Observable<Product[]>): void {
    products.subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      () => {
        this._snackBar.open('Something went wrong', 'Close', { duration: 3000 });
      }
    );
  }





}
