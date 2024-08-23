import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  public apiData: any[] = [];

  constructor(private http: HttpClient) {
    localStorage.clear();
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  public compareProducts: any[] = [];

  getComparedProducts() {
    return this.compareProducts;
  }

  addProductToCompare(product: any): boolean {
    if (this.compareProducts.length < 4 && !this.isProductInCompare(product)) {
      this.compareProducts.push(product);
      localStorage.setItem(
        'compare-products',
        JSON.stringify(this.compareProducts)
      );
      return true;
    }
    return false;
  }

  isProductInCompare(product: any): boolean {
    return this.compareProducts.some((p) => p.id === product.id);
  }
}
