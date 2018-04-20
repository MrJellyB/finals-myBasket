import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import { BasketHandleService } from 'app/services/basket.service';
import { EventService } from 'app/services/event.service';
import { LocalStorageService } from 'app/services/localStorageService';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  errorConnecting: boolean;
  model: any = {};
  isCurrentDetails: string;

  constructor(private userService: UsersService,
    private basketService: BasketHandleService,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.errorConnecting = false;
  }

  // get userName() {
  //   return this.userService.userName();
  // }

  onSubmit(userloginForm: any, event: Event) {
    event.preventDefault();
    this.userService.loginWithAuthenticate(this.model.userName, this.model.password).subscribe(
      (result) => {
        if (result) {
          this.basketService.getBasketByUser(this.model.userName).subscribe((b: any) => {
            if (b && b.basketItems) {
              this.localStorageService.set("basketItems", b.basketItems);
              this.localStorageService.set("basketId", b.id);
              this.localStorageService.set("streetName", b.streetName);

              this.eventService.emit('BASKET_ITEMS');
            }
          });
          this.userService.getUserTypeByUserName(this.model.userName).subscribe(
            (userData) => {
              if (userData && userData[0].userType) {
                this.localStorageService.set('userType', userData[0].userType);
                this.router.navigate(['/']);
              }
            }
          )
        } else {
          // login failed
          alert('פרטי המשתמש שגויים');
          this.isCurrentDetails = "פרטי המשתמש שגויים";
          this.errorConnecting = true;
        }
      }
    )
  }
}
