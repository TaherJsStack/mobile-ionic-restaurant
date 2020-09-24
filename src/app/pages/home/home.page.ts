import { Component } from '@angular/core';
import { CategoriesService } from '../../providers/categories.service';
import { CartService } from '../../providers/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

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
      console.log('=================================> HomePage <==========================================')
     }

  ngOnInit() {

    this.translate.use('en'); 

    this.Subscription = this.CategoriesService.getShopCate()
      .subscribe(shop => {
        this.categories = shop.categories
        this.index = this.categories[0];
        
        this.CategoriesService.getCategoryProducts(this.index._id);
        this.Subscription = this.CategoriesService.getAllProductsUpdatedListener()
        .subscribe(products => {
          this.products = products.products
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
