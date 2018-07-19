import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from 'app/interface/entities.interface';
import { UserType } from 'app/utils/enums';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  model: any = {};
  loading = false;
  user: User;
  passIndication = true;
  emailPattern = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

  constructor(private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    // setting the gender as male
    this.model.gender = 1;
  }

  userName() {
    return this.userService.userName();
  }

  validate() {
    if (this.model.password != this.model.repeatPassword) {
      return false;
    }
    else {
      return true;
    }
  }

  _keyPressEmail(event: any) {
        
      }

  checkPattern(pattern, inputChar) {
              }

  onSubmit(f: any, event: Event) {
    event.preventDefault();

    if (this.model.password == this.model.repeatPassword) {
      this.passIndication = false;
      this.loading = true;
      this.user = <User>{};
      this.user.id = this.model.id;
      this.user.firstName = this.model.firstName;
      this.user.lastName = this.model.lastName;
      this.user.email = this.model.email;
      this.user.gender = +this.model.gender;
      this.user.password = this.model.password;
      this.user.userName = this.model.userName;
      this.user.userType = UserType.Regular;

      this.userService.register(this.user).subscribe(
        (results) => {
          this.router.navigate(['/login']);
        }
        ,
        err => {

        })
    }
  }
}
