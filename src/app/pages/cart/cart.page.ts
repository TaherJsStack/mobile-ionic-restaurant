import { Component, OnInit } from '@angular/core';
import { CartService } from '../../providers/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  Subscription: Subscription;
  cartItems;
  cartTotal;

  constructor(private CartService: CartService,
    private translate: TranslateService,
  ) { 
    console.log('=================================> CartPage <==========================================')

  }

  ngOnInit() {

    this.translate.use('en');
    this.cartItems = this.CartService.getCartItems()
    this.cartTotal = this.CartService.getTotal()
    this.Subscription = this.CartService.getTotalUpdatedListener()
      .subscribe(total => {
        this.cartTotal = total;
      });
  }

  onRemove(id) {
    this.CartService.deleteProduct(id);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}
