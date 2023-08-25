import { NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Product, ProductsService } from 'src/@api';
import { ProductFormComponent } from './product-form/product-form.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgIf, NgForOf, MatButtonModule, MatIconModule, MatSnackBarModule, MatMenuModule, UpperCasePipe, MatDialogModule]
})
export class AdminDashboardComponent implements OnInit {

  products: Product[] = [];

  tempProduct: Product | undefined;
  displayedColumns: string[] = ['title', 'category', 'price', 'description', 'actions'];

  constructor(
    protected _t: Title,
    private _productsService: ProductsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) {
    _t.setTitle('Dashboard');
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    console.log('getProductList');

    this._productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this._snackBar.open('Error while loading products', 'Dismiss');
      }
    );
  }


  deleteProduct(id: number) {
    this._productsService.deleteProduct(id).subscribe(
      () => {
        this._snackBar.open('Product deleted successfully', 'Dismiss');
        this.products = this.products.filter(p => p.id !== id);
      },
      () => {
        this._snackBar.open('Error while deleting product', 'Dismiss');
      }
    );
  }






  openModal(product?: Product): void {
    const fnType = product ? 'edit' : 'create';
    this._dialog.open(ProductFormComponent, {
      data: product,
      width: '500px',
    }).afterClosed().subscribe((product) => {
      console.log('product', product);

      if (product) {
        this.updateProducts(product, fnType);
      }
    });
  }

  updateProducts(product: Product, fnType: string): void {
    if (fnType === 'edit') {
      this.products = this.products.map(p => p.id === product.id ? product : p);
    } else {
      this.products = [product, ...this.products];
    }
  }
}
