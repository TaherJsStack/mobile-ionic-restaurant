import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../providers/cart.service';
import { ToastController } from '@ionic/angular';
import { CategoriesService } from '../../providers/categories.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {

  cart = [];
  items = [];
  cartItems;
  cartTotal;

  Subscription: Subscription;
  product;
  categoryname;
  isNetworRun;
  itemsCount: boolean = false;
  itemsPriceTotal = 0;
  productOptions;
  checkedBigCombo;
  checkedSmallCombo;

  constructor(
    private translate: TranslateService,
    private CategoriesService: CategoriesService,
    private route: ActivatedRoute,
    private cartService: CartService,
    public toastCtrl: ToastController) {
    console.log('========================== ProductsPage ======================================')
  }

  ngOnInit() {

    this.translate.use('en');

    this.cartItems = this.cartService.getCartItems()
    this.cartService.getTotal()
    this.Subscription = this.cartService.getTotalUpdatedListener()
      .subscribe(total => {
        this.cartTotal = total;
      });

    this.Subscription = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.product = this.CategoriesService.getProduct(paramMap.get('id'));
          this.productOptions = this.product.productOptions.split(",")
        }
      });
  }

  bigCombo(e) {
    if (e.detail.checked == true) {
      this.checkedSmallCombo = true;
      this.cartService.addToItemPrice(this.product, e.detail.value, 'big combo');   
    } else {
      this.checkedSmallCombo = false;
      this.cartService.removeFromItemPrice(this.product, e.detail.value, '');   
    }
  }

  smallCombo(e) {
    if (e.detail.checked == true) {
      this.checkedBigCombo = true;
      this.cartService.addToItemPrice(this.product, e.detail.value, 'small combo');   
    } else {
      this.checkedBigCombo = false;
      this.cartService.removeFromItemPrice(this.product, e.detail.value, '');   
    }
  }

  haveFlavor(e) {
    this.cartService.haveFlavor(this.product, e.detail.value);
  }

  specialRequest(e) {
    this.cartService.specialRequest(this.product, e.detail.value);
  }

  isBought(product) {
    return this.cartService.isProductOnCart(product);
  }

  isItemsCount(val) {
    this.itemsCount = val;
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  onAdd(product) {
    this.itemsPriceTotal += 1;
    this.cartService.addItemsQun(product)
  }

  onRemove(product, productID: string) {
    this.itemsPriceTotal -= 1;
    this.cartService.addRemoveQun(product, productID)
  }

  onDeleteProduct(productID) {
    this.cartService.deleteProduct(productID)
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe()
  }

}
