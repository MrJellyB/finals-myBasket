import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { UsersService } from 'app/services/users.service';
import { BasketService } from 'app/services/basket-service.service';

@Component({
  selector: 'app-statistics-main-page',
  templateUrl: './statistics-main-page.component.html',
  styleUrls: ['./statistics-main-page.component.css']
})
export class StatisticsMainPageComponent {
  public productId: string;

  constructor(private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private UsersService: UsersService) { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    //document.getElementById("mySidenav").style.width = "0";
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
  addProductView() {
    this.closeNav();
    this.router.navigate(['/add-or-update-product']);
  }
  loginView() {
    this.closeNav();
    this.router.navigate(['/login'])
  }
  registerView() {
    this.closeNav();
    this.router.navigate(['/register'])
  }

  weatherView() {
    this.closeNav();
    this.router.navigate(['/weather'])
  }

  productListView() {
    this.closeNav();
    this.router.navigate(['/product-list'])
  }

  basketView() {
    this.closeNav();
    this.router.navigate(['/basket'])
  }

  userName() {
    return localStorage.getItem('currentUser');
  }

  getDisplayUserName() {
    let displayValue = JSON.parse(localStorage.getItem('currentUser')).userName;
    return displayValue;
  }

  getUserStatus() {
    return localStorage.getItem('userType');
  }

  managerView() {
    this.closeNav();
    this.router.navigate(['/manager-page'])
  }

  logOff() {
    this.closeNav();
    this.UsersService.logout();
  }

  HistoryOneView() {
    this.closeNav();
    this.router.navigate(['/history-one-d3js/' + this.productId])
  }

  barChart() {
    this.closeNav();
    this.router.navigate(['/history-two-chart-bar'])
  }

  setMainPage() {
    this.closeNav();
    this.router.navigate(['/'])
  }

  facebookView() {
    this.closeNav();
    this.router.navigate(['/facebook-api'])
  }

  cheapestProduct() {
    this.closeNav();
    this.router.navigate(['/cheapest-product'])
  }

  preferredProduct() {
    this.closeNav();
    this.router.navigate(['/preferred-product'])
  }

  getAmountInBasket(): number {
    return BasketService.getAllAmount();
  }

  getProductsByCategory(id) {
    this.closeNav();
    this.router.navigate(['/product-list/' + id])
  }

}
