import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from '../users-service.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  errorConnecting:boolean;
  model: any = {};
  isCurrentDetails: string;
  
  constructor(private userService: UsersServiceService,
              private router: Router) {
    this.errorConnecting = false; 
  }

  ngOnInit() {
  }

  userName() {
    return this.userService.userName();
  }

  onSubmit(userloginForm: any, event: Event) {
    event.preventDefault();
    this.userService.loginWithAuthenticate(this.model.userName, this.model.password).subscribe(
      (result) => {
        if (result) {
          if (result === true) {
            this.userService.getUserTypeByUserName(this.model.userName).subscribe(
              (userData) => {
                if (userData != null) {
                  if (userData[0].userType) {
                    localStorage.setItem('userType', userData[0].userType.toString());
                    this.router.navigate(['/']);
                  }
                }
              }
            )
          }
        }
        else {
          // login failed
          alert('פרטי המשתמש שגויים');
          this.isCurrentDetails = "פרטי המשתמש שגויים";
          this.errorConnecting = true;
        }
      }
    )
  }


  /*
  onSubmit(userloginForm:any, event:Event) {
    event.preventDefault();

    console.log(this.model);

    this.userService.login(this.model.userName, this.model.password).subscribe(
      (result) => {
        // TODO: add here a router redirection to main page with the user credentials
        if (result) {
          this.isCurrentDetails = "התחבר למשתמש";
          this.errorConnecting = false;
          alert('התחברת לאתר בהצלחה');
          localStorage.setItem('currentUser', this.model.userName);
          ;

          this.userService.getUserTypeByUserName(this.model.userName).subscribe(
            (userData) => {
              if (userData != null) {
                if (userData[0].userType)
                localStorage.setItem('userType', userData[0].userType.toString());
                this.router.navigate(['/']);
              }
            }
          )

        }
        else {
          alert('פרטי המשתמש שגויים');
          this.isCurrentDetails = "פרטי המשתמש שגויים";
          this.errorConnecting = true;
        }
      },
    (err) => {
      console.log('error:' + err);
      this.errorConnecting = true;
    });
  }*/
}
