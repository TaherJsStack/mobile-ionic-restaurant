import { Injectable } from '@angular/core';
import { Subject } from 'node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_API_CATE = environment.API_URL + '/categories/';
const BACKEND_API_PROD = environment.API_URL + '/products/';
// const shopId = environment.shopId;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  categories;
  products;
  productsUpdated = new Subject<{products, proCount: number}>();

  categoriesUpdated = new Subject();
  categoriesEditIndex = new Subject<number>();

  constructor( private http: HttpClient) { }

  // get one shop categories
  getShopCate() {
    return this.http.get<{ categories: any, message: string }>(BACKEND_API_CATE);
  }

  getCategoryProducts(categoryId) {
    console.log('getCategoryProducts =>', this.http.get<{ products: any, message: string }>(BACKEND_API_PROD + 'getCategoryProducts/' + categoryId))
    return this.http.get<{ products: any, message: string }>(BACKEND_API_PROD + 'getCategoryProducts/' + categoryId)
    .subscribe( (productsData) => {
      this.products = productsData.products;
      this.productsUpdated.next({
        products: [...this.products],
        proCount: productsData.products.length
        });
    })
  }

  getAllProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  getProducts() {
    return this.http.get<{ products: any, message: string }>(BACKEND_API_PROD + 'getCategoryProducts/');
  }

  // get new value for All Cateories on thing Upate Listener
  getAllCatesUpateListener() {
    return this.categoriesUpdated.asObservable();
  }

    // get only one category
  getProduct(productId: string) {
    const index = this.products.findIndex(product => product._id === productId);
    if (index !== -1) {
      return this.products[index];
    }
  }

}
