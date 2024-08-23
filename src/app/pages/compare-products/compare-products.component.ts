import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.css'],
})
export class CompareProductsComponent {
  compareProducts: any[] = [];
  isModalVisible: boolean = false;
  public productLenght;
  products: any[] = [];

  constructor(public productService: ProductService) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
    });
    // Assume the compared products are passed via service
    this.compareProducts = this.productService.getComparedProducts();
    this.productLenght = this.productService.compareProducts;
  }

  ngOnInit(): void {}

  removeProduct(product: any): void {
    this.compareProducts = this.compareProducts.filter(
      (p) => p.id !== product.id
    );
    this.productService.compareProducts = this.compareProducts;
    this.productLenght = this.productService.compareProducts;
  }

  addProductToCompare(product: any): void {
    if (this.productService.addProductToCompare(product)) {
      this.isModalVisible = false;
    }
  }

  isProductInCompare(product: any): boolean {
    console.log(this.compareProducts.some((p) => p.id === product.id));
    return this.compareProducts.some((p) => p.id === product.id);
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  addMoreProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
    console.log(this.products);
    this.isModalVisible = true;
  }
}
