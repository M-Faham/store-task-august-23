import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from 'src/@api';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, UpperCasePipe]
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product
  constructor() { }

  ngOnInit() {
  }

}
