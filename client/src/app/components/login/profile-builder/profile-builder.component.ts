import { Component, EventEmitter } from '@angular/core';
import { ProfileBuilder, City, UserAddress, FamilyData, Preferences, Avoidness, User } from '../../../interface/entities.interface';
import { UsersService } from '../../../services/users.service';
import { ePreferences, eAvoidness } from '../../../utils/enums';
@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent {
  public profileBuilder: ProfileBuilder;
  cities: City[];
  user: User;
  userName: string;
  select: EventEmitter<string>;
  selectedCity: number;
  public ePreferencesEnum = ePreferences;
  public eAvoidnessEnum = eAvoidness;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.select = new EventEmitter();
    this.createProfileBuilderObject();
    this.getAllCities();
    this.userName = this.getDisplayUserName();
    this.getUserProfile();
  }

  getUserProfile() {
    this.usersService.getUserTypeByUserName(this.userName).subscribe(
      (userData: any) => {
        debugger;
        this.user = userData[0];
        if (this.user && this.user.profile) {
          this.profileBuilder = this.user.profile;

          if (this.profileBuilder &&
            this.profileBuilder.address &&
            this.profileBuilder.address.city) {
            this.selectedCity = this.profileBuilder.address.city;
          }
        }
      }
    )
  }

  getDisplayUserName() {
    let displayValue = JSON.parse(localStorage.getItem('currentUser')).userName;
    return displayValue;
  }

  createProfileBuilderObject() {
    this.profileBuilder = <ProfileBuilder>{};
    this.profileBuilder.address = <UserAddress>{};
    this.profileBuilder.peopleAmount = <FamilyData>{};
    this.profileBuilder.preferences = <Preferences>{};
    this.profileBuilder.avoidness = <Avoidness>{};
    this.profileBuilder.avoidness.eggs = false;
    this.profileBuilder.avoidness.ful = false;
    this.profileBuilder.avoidness.gluten = false;
    this.profileBuilder.avoidness.milk = false;
    this.profileBuilder.avoidness.nuts = false;
    this.profileBuilder.avoidness.peanuts = false;
    this.profileBuilder.avoidness.soy = false;
    this.profileBuilder.preferences.kosher = false;
    this.profileBuilder.preferences.vegan = false;
    this.profileBuilder.preferences.veggie = false;
    this.profileBuilder.peopleAmount.adults = 0
    this.profileBuilder.peopleAmount.babies = 0;
    this.profileBuilder.peopleAmount.kids = 0;
  }

  saveProfileBuilder() {
    this.usersService.saveProfileBuilder(this.profileBuilder, this.userName).subscribe(
      (data: any) => {
        debugger;
        alert("הרכבת פרופיל נשמר בהצלחה");
      }
    )
  }

  getAllCities() {
    this.usersService.getCities().subscribe(
      (data: any) => {
        this.cities = data
        this.selectedCity = this.cities[0]._id;
      }
    )
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  selectItem(value) {
    this.select.emit(value);
    this.selectedCity = +value;
    this.profileBuilder.address.city = +value;
  }

  checkAvoidness(e: any, avoid: number) {
    let value = e.target.checked;

    switch (avoid) {
      case (eAvoidness.Eggs):
        {
          this.profileBuilder.avoidness.eggs = value;

          break;
        }
      case (eAvoidness.Ful):
        {
          this.profileBuilder.avoidness.ful = value;

          break;
        }
      case (eAvoidness.Gluten):
        {
          this.profileBuilder.avoidness.gluten = value;

          break;
        }
      case (eAvoidness.Milk):
        {
          this.profileBuilder.avoidness.milk = value;

          break;
        }
      case (eAvoidness.Nuts):
        {
          this.profileBuilder.avoidness.nuts = value;

          break;
        }
      case (eAvoidness.Peanuts):
        {
          this.profileBuilder.avoidness.peanuts = value;

          break;
        }
      case (eAvoidness.Soy):
        {
          this.profileBuilder.avoidness.soy = value;

          break;
        }
      default:
        {
          break;
        }
    }
  }

  checkPreferences(e: any, pref: number) {
    let value = e.target.checked;

    switch (pref) {
      case (ePreferences.Kosher):
        {
          this.profileBuilder.preferences.kosher = value;

          break;
        }
      case (ePreferences.Vegan):
        {
          this.profileBuilder.preferences.vegan = value;

          break;
        }
      case (ePreferences.Veggie):
        {
          this.profileBuilder.preferences.veggie = value;

          break;
        }
      default:
        {
          break;
        }

    }
  }

}
