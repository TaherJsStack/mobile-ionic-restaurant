import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../providers/categories.service';
import { CartService } from '../../providers/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.page.html',
  styleUrls: ['./make-order.page.scss'],
})
export class MakeOrderPage implements OnInit {

  Subscription: Subscription;
  categories;
  products;
  index;
  cartTotal;
  cartItems;
  spinner = true;

  constructor(
    private translate: TranslateService, 
    private CategoriesService: CategoriesService,
    private cartService: CartService) {
      console.log('=================================> MakeOrderPage <==========================================')
     }

  ngOnInit() {

    this.translate.use('en'); 

    this.Subscription = this.CategoriesService.getShopCate()
      .subscribe(shop => {
        console.log('shop.categories =>', shop.categories)
        this.categories = shop.categories
        this.index = this.categories[0];
        
        this.CategoriesService.getCategoryProducts(this.index._id);
        this.Subscription = this.CategoriesService.getAllProductsUpdatedListener()
        .subscribe(products => {
          this.products = products.products
          console.log('products.products =>', products.products)

          this.spinner = false;
          this.cartItems = this.cartService.getCartItems()
          this.cartService.getTotal()
          this.Subscription = this.cartService.getTotalUpdatedListener()
          .subscribe(total => {
            this.cartTotal = total;
          });

        });
      });
  }

  segmentChanged(ev: any) {
    this.index = this.categories.find(x => x.name === ev.detail.value);
    console.log('ev.detail.value =>', ev.detail.value)
    console.log(' this.index  =>',  this.index )
    this.CategoriesService.getCategoryProducts(this.index._id);
    this.Subscription = this.CategoriesService.getAllProductsUpdatedListener()
      .subscribe(products => {
        this.products = products.products
      });
  }

  isBought(product) {
    return this.cartService.isProductOnCart(product);
  }

  clickKey(key) {
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  onAdd(product) {
    product.clientItems += 1;
    this.cartService.addItemsQun(product)
  }

  onRemove(product, productID: string) {
    this.cartService.addRemoveQun(product, productID)
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}
