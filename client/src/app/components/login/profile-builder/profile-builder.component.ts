import { Component } from '@angular/core';
import { ProfileBuilder, City } from '../../../interface/entities.interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent {
  public profileBuilder: ProfileBuilder;
  cities: City[];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    debugger;
    this.profileBuilder = <ProfileBuilder>{};
    this.getAllCities();
  }

  saveProfileBuilder() {
  }

  getAllCities() {
    this.usersService.getCities().subscribe(
      (data: any) => {
        debugger;
        this.cities = data
      }
    )
  }
}
