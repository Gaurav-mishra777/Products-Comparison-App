import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {
    if (!this.products.length) {
      console.log();
      this.productService.getProducts().subscribe((data) => {
        this.products = data.products;
      });
    }
  }

  ngOnInit(): void {}
  compareProducts: any[] = [];

  addToCompare(product: any): void {
    if (this.compareProducts.length < 4 && !this.isProductInCompare(product)) {
      this.productService.addProductToCompare(product);
    }
  }

  isProductInCompare(product: any): boolean {
    this.compareProducts = JSON.parse(localStorage['compare-products'] || '[]');
    console.log(this.compareProducts);
    return this.compareProducts.some((p) => p.id === product.id);
  }
}
