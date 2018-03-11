import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from 'app/components/login/user-login/user-login.component';
import { RegisterUserComponent } from 'app/components/login/register-user/register-user.component';
import { ManagerPageComponent } from 'app/components/login/manager-page/manager-page.component';
import { ProfileBuilderComponent } from 'app/components/login/profile-builder/profile-builder.component';
import { UsersService } from 'app/services/users.service';

@NgModule({
  declarations: [
    UserLoginComponent,
    RegisterUserComponent,
    ManagerPageComponent,
    ProfileBuilderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [UsersService],
  bootstrap: [],
  exports: [
    UserLoginComponent,
    RegisterUserComponent
  ]
})
export class LoginModule { }
