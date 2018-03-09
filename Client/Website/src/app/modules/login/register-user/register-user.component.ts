import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../users-service.service';
import { FormGroup } from '@angular/forms';
import { User } from '../../../shared/entities/User';
import { EeUserType} from '../../../shared/enums/eUserType'


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  model: any = {};
  loading = false;
  user: User;
  passIndication = true;

  constructor(private router: Router,
              private userService: UsersServiceService) { }

  ngOnInit() {
    // setting the gender as male
    this.model.gender = 1;
  }

  userName() {
    return this.userService.userName();
  }

  onSubmit(f: any, event: Event) {
    event.preventDefault();

    if (this.model.password == this.model.repeatPassword) {
      this.passIndication = false;
      this.loading = true;
      this.user = new User();
      this.user.id = this.model.id;
      this.user.firstName = this.model.firstName;
      this.user.lastName = this.model.lastName;
      this.user.email = this.model.email;
      this.user.gender = +this.model.gender;
      this.user.password = this.model.password;
      this.user.userName = this.model.userName;
      this.user.userType = EeUserType.Regular;
      
      this.userService.register(this.user).subscribe(
        (results) =>
        {
          this.router.navigate(['/login']);
        }
        ,
        err =>
        {

        })
    }
  }
}
