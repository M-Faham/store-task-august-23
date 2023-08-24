import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CategoriesService, Product, ProductsService } from 'src/@api';
import { ProductCardComponent } from 'src/app/core/components/product-card/product-card.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, FormsModule, MatFormFieldModule, NgIf, MatButtonModule, MatInputModule, MatSelectModule, MatIconModule, NgForOf, ProductCardComponent, MatPaginatorModule]
})
export class StoreComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];
  categories: string[] = [];
  search: string;

  constructor(
    protected _t: Title,
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService,
    private _snackBar: MatSnackBar,
  ) {
    _t.setTitle('Store');
  }

  ngOnInit() {
    this.getProductList();
    this.getCategories();
  }



  getProductList() {
    this._getProducts(this._productsService.getProducts());
  }


  public getProductsByCategory(category: string) {
    if (!category) {
      this.getProductList();
      return;
    }

    this._getProducts(this._productsService.getProductsByCategory(category));
  }

  public searchProducts() {
    if (!this.search || !this.search.trim()) { this.filteredProducts = this.products; return; }

    this.filteredProducts = this.products.filter((product) => {
      return product.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }



  getCategories() {
    this._categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      () => {
        this._snackBar.open('Something went wrong', 'Close', { duration: 3000 });
      }
    );
  }


  private _getProducts(products: Observable<Product[]>): void {
    products.subscribe(
      (data) => {
        this.products = data;
        this.searchProducts();
      },
      () => {
        this._snackBar.open('Something went wrong', 'Close', { duration: 3000 });
      }
    );
  }





}
