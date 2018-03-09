import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserLoginComponent } from './user-login-component/user-login.component';
import { UsersServiceService } from './users-service.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
@NgModule({
  declarations: [UserLoginComponent, RegisterUserComponent, ManagerPageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [UsersServiceService],
  bootstrap: [],
  exports: [UserLoginComponent, RegisterUserComponent]
})
export class LoginModule { }
