import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BasketService } from 'app/services/basket-service.service';
import { EventService } from 'app/services/event.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';

declare var $;

@Component({
  selector: 'app-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.css']
})
export class MainNavigatorComponent {
  productId: string;
  basketItemsAmount: number;
  subs: Subscription[] = [];

  constructor(private router: Router,
    private _renderer2: Renderer2,
    private usersService: UsersService,
    private basketService: BasketService,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
    // let script = this._renderer2.createElement('script');
    // script.type = "text/javascript";
    // script.text = `
    // var canvas = document.getElementById("welcomeCanvas");
    // var x = canvas.width;
    // var y = canvas.height;

    // var ctx = canvas.getContext('2d');
    // ctx.textAlign = "right"
    // ctx.font = "50px Segoe UI";
    // ctx.shadowColor = "rgb(190, 190, 190)";
    // ctx.shadowOffsetX = 10;
    // ctx.shadowOffsetY = 10
    // ctx.shadowBlur = 10;

    // var gradient = ctx.createLinearGradient(x, y, x-150, y-100);
    // gradient.addColorStop(0, "rgb(97, 250, 97)");
    // gradient.addColorStop(1, "rgb(110, 129, 255)");
    // ctx.fillStyle = gradient;
    // ctx.fillText("מערכת הסל שלי", x, y - 14);
    //     `;

    // this._renderer2.appendChild(this._document.body, script);
    this.basketItemsAmount = this.basketService.getAllAmount();
    this.subs.push(
      this.eventService.observe('BASKET_ITEMS').subscribe(() => {
        this.basketItemsAmount = this.basketService.getAllAmount();
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  addProductView() {
    this.router.navigate(['/add-or-update-product']);
  }
  loginView() {
    this.router.navigate(['/login'])
  }
  registerView() {
    this.router.navigate(['/register'])
  }

  productListView() {
    this.router.navigate(['/product-list'])
  }

  basketView() {
    this.router.navigate(['/basket'])
  }

  getDisplayUserName() {
    let displayValue = this.localStorageService.get('currentUser').userName;
    return displayValue;
  }

  getUserStatus() {
    return this.localStorageService.get('userType');
  }

  managerView() {
    this.router.navigate(['/manager-page'])
  }

  logOff() {
    this.usersService.logout();
  }
  HistoryOneView() {
    this.router.navigate(['/history-one-d3js/' + this.productId])
  }

  barChart() {
    this.router.navigate(['/history-two-chart-bar'])
  }

  setMainPage() {
    this.router.navigate(['/'])
  }

  cheapestProduct() {
    this.router.navigate(['/cheapest-product'])
  }

  preferredProduct() {
    this.router.navigate(['/preferred-product'])
  }

  getAmountInBasket(): number {
    return this.basketService.getAllAmount();
  }

  getProductsByCategory(id) {
    this.router.navigate(['/product-list/' + id]).then(() => $("#navbarNavDropdown2").collapse('hide'));
  }

  userName() {
    return this.usersService.userName();
  }

  userType() {
    return this.usersService.getUserStatus();
  }

  checkManager() {
    return this.userName() != null && this.userType() == "2";
  }

  getProductListFilter() {
    this.router.navigate(['/product-list-filter']).then(() => $("#navbarNavDropdown2").collapse('hide'));
  }

}

