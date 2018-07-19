import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BasketService } from 'app/services/basket-service.service';
import { EventService } from 'app/services/event.service';
import { LocalStorageService } from 'app/services/localStorageService';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';
import * as websiteScript from 'assets/scripts/website.js';

declare var $;

@Component({
  selector: 'app-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.css']
})
export class MainNavigatorComponent {
  productId: string;
  basketItemsAmount: number;
  subscriptions: Subscription[] = [];
  currentCategory: number;
  isClosed: boolean = false;
  refreshIntervalId: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _renderer2: Renderer2,
    private usersService: UsersService,
    private basketService: BasketService,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        var urlParts = (event as NavigationEnd).url.split('/');
        this.currentCategory = +(urlParts[2]) || -1;

        if ((this.currentCategory == -1) && (urlParts[1] == "product-list-filter")) {
          this.currentCategory = 0;
        }

        clearInterval(this.refreshIntervalId);

        this.refreshIntervalId = setInterval(function () {
          $('.slideshow > img:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('.slideshow');
        }, 6000);
      });

    this.basketItemsAmount = this.basketService.getAllAmount();
    this.subscriptions.push(
      this.eventService.observe('BASKET_ITEMS').subscribe(() => {
        this.basketItemsAmount = this.basketService.getAllAmount();
      }));
  }

  ngAfterViewInit() {
  }

  toggleSideMenu() {
    if (this.isClosed == true) {
      $('.overlay').hide();
      this.isClosed = false;
    } else {
      $('.overlay').show();
      this.isClosed = true;
    }

    $('#sidebar-wrapper').toggleClass('toggled');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getDisplayUserName() {
    let displayValue = this.localStorageService.get('currentUser').userName;
    return displayValue;
  }

  getUserStatus() {
    return this.localStorageService.get('userType');
  }

  logOff() {
    this.usersService.logout();
  }

  getAmountInBasket(): number {
    return this.basketService.getAllAmount();
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

  // Router navigate
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

  newProduct() {
    if (this.currentCategory > 0)
      this.router.navigate(['/product-list/' + this.currentCategory + '/new']);
    else
      this.router.navigate(['/product-list-filter/new']);
  }

  managerView() {
    this.router.navigate(['/manager-page'])
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

  getProductsByCategory(id) {
    this.router.navigate(['/product-list/' + id]).then(() => $("#navbarNavDropdown2").collapse('hide'));
  }

  getProductListFilter() {
    this.router.navigate(['/product-list-filter']).then(() => $("#navbarNavDropdown2").collapse('hide'));
  }
}

