import { Component, Renderer2, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../modules/login/users-service.service';
import { BasketItemModule } from '../../modules/basket/basket-item.module';
import { BasketModule } from '../../modules/basket/basket.module';
import { BasketService } from '../../services/basketService/basket-service.service';

@Component({
  selector: 'app-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.css']
})
export class MainNavigatorComponent implements OnInit {
  public productId: string;
  
  constructor(private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private usersServiceService: UsersServiceService) { }

  ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.type = "text/javascript";
    script.text = `
    var canvas = document.getElementById("welcomeCanvas");
    var x = canvas.width;
    var y = canvas.height;

    var ctx = canvas.getContext('2d');
    ctx.textAlign = "right"
    ctx.font = "50px Segoe UI";
    ctx.shadowColor = "rgb(190, 190, 190)";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10
    ctx.shadowBlur = 10;

    var gradient = ctx.createLinearGradient(x, y, x-150, y-100);
    gradient.addColorStop(0, "rgb(97, 250, 97)");
    gradient.addColorStop(1, "rgb(110, 129, 255)");
    ctx.fillStyle = gradient;
    ctx.fillText("מערכת הסל שלי", x, y - 14);
        `;

    this._renderer2.appendChild(this._document.body, script);
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

  weatherView() {

    this.router.navigate(['/weather'])
  }

  productListView() {

    this.router.navigate(['/product-list'])
  }

  basketView() {

    this.router.navigate(['/basket'])
  }

  aboutView() {
    this.router.navigate(['/about-data'])
  }

  getDisplayUserName() {
    let displayValue = JSON.parse(localStorage.getItem('currentUser')).userName;
    return displayValue;
  }

  getUserStatus() {
    return localStorage.getItem('userType');
  }

  managerView() {
    this.router.navigate(['/manager-page'])
  }

  logOff() {

    this.usersServiceService.logout();
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

  facebookView() {

    this.router.navigate(['/facebook-api'])
  }

  cheapestProduct() {

    this.router.navigate(['/cheapest-product'])
  }

  preferredProduct() {

    this.router.navigate(['/preferred-product'])
  }

  getAmountInBasket(): number {
    return BasketService.getAllAmount();
  }

  getProductsByCategory(id) {

    this.router.navigate(['/product-list/' + id])
  }

  userName() {
    return this.usersServiceService.userName();
  }

  userType() {
    return this.usersServiceService.getUserStatus();
  }

  checkManager() {
    return this.userName() != null && this.userType() == "2";
  }
}

