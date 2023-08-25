import { NgForOf, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product, ProductsService } from 'src/@api';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, MatButtonModule, MatIconModule, MatSnackBarModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,]
})
export class ProductFormComponent implements OnInit {

  product: Product;
  productForm: UntypedFormGroup


  constructor(
    private _formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private _snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    private _data: Product,
  ) {
    this.product = _data;
  }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.product) {
      this.productForm.reset(this.product);
    }
  }


  createProduct(): Observable<Product> {
    const product = this.productForm.value;
    return this._productsService.createProduct(product)
  }

  editProduct(): Observable<Product> {
    const product = this.productForm.value;
    product.id = this.product.id;
    return this._productsService.updateProduct(product)
  }

  private excuteApi(fn: Observable<Product>) {
    fn.subscribe(
      (res) => {
        this._snackBar.open('Product updated successfully', 'Dismiss');
        this.matDialogRef.close(res);
      },
      () => {
        this._snackBar.open('Error while updating product', 'Dismiss');
      }
    );
  }


  onSave() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.product) {
      this.excuteApi(this.editProduct());
    } else {
      this.excuteApi(this.createProduct());
    }

  }

}
