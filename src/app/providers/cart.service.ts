import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const BACKEND_API = environment.API_URL + '/orders/';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  cartItems = [];
  orders = [];
  cartUpdated = new Subject();
  ordersUpdated = new Subject();
  cartPriceUpdated = new Subject<number>();

  constructor(private http: HttpClient) {
    this.getTotal()
    this.cartUpdated.next([...this.cartItems]);
    this.cartPriceUpdated.next(this.getTotal());
  }

  ngOnInit() {
    this.getTotal()
  }

  getProducts() {
    // return this.db.list('/products').valueChanges();
  }

  getCartItems() {
    this.cartPriceUpdated.next(this.getTotal());
    return this.cartItems;
  }

  addProduct(product) {
    this.cartItems.push(product);
    this.cartPriceUpdated.next(this.getTotal());
  }

  isProductOnCart(product) {
    this.cartPriceUpdated.next(this.getTotal());
    return this.cartItems.find((producEl) => {
      return producEl._id === product._id;
    });
  }

  addItemsQun(product) {
    product.clientItems += 1;
    this.cartPriceUpdated.next(this.getTotal());
    this.cartUpdated.next([...this.cartItems]);
    this.cartPriceUpdated.next(this.getTotal());
  }

  specialRequest(product, options) {
    product.userOptions = options;
  }

  haveCombo(product, size) {
    product.sizeValue = size;
  }

  addToItemPrice(product, newPrice, combo) {
    product.price += +newPrice;
    product.sizeValue = combo;
  }

  removeFromItemPrice(product, newPrice, combo) {
    product.price -= +newPrice;
    product.sizeValue = combo;
  }


  haveFlavor(product, flavor) {
    product.userFlavor = flavor;
  }

  addRemoveQun(product, productID: string) {
    product.clientItems -= 1;
    if (product.clientItems <= 0) {
      product.clientItems = 1;
      this.deleteProduct(productID);
    }
    this.cartPriceUpdated.next(this.getTotal());
  }

  deleteProduct(productID: string) {
    const index = this.cartItems.findIndex(producs => producs._id === productID);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartPriceUpdated.next(this.getTotal());
  }

  sendOrder(orderData: any) {
    
    return this.http.post<{ message: string, orderCode: any}>(BACKEND_API, orderData);
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].price) {
        total += this.cartItems[i].price * this.cartItems[i].clientItems;
      }
    }
    return total;
  }

  getAllcartsUpdatedListener() {
    return this.cartUpdated.asObservable();
  }

  getTotalUpdatedListener() {
    return this.cartPriceUpdated.asObservable();
  }

  //  send Order empty cart from items and total price to 0
  declareCartItems() {
    length = this.cartItems.length;
    this.cartUpdated.next(this.cartItems.splice(length));
    this.cartUpdated.next(this.cartItems = []);
    this.cartPriceUpdated.next(0);
  }

  getAllOrdersUpdatedListener() {
    return this.ordersUpdated.asObservable();
  }

  fiendOrder(orderId) {
    console.log(orderId);
  }

  getOrderByCode(code) {
    // console.log('getOrderByCode =>', code)
    return this.http.get<{ order: any, message: string }>(BACKEND_API + 'getOrderByCode/' + code );
  }

  clearCart() {
    this.cartItems = [];
    this.getTotal()
    this.cartUpdated.next([...this.cartItems]);
    this.cartPriceUpdated.next(this.getTotal());
  }


}
