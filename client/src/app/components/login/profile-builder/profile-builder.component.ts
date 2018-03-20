import { Component, EventEmitter } from '@angular/core';
import { ProfileBuilder, City, UserAddress, FamilyData, Preferences, Avoidness } from '../../../interface/entities.interface';
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
  select: EventEmitter<string>;
  selectedCity: number;
  public ePreferencesEnum = ePreferences;
  public eAvoidnessEnum = eAvoidness;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.select = new EventEmitter();
    this.createProfileBuilderObject();
    this.getAllCities();
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
  }

  saveProfileBuilder() {
  }

  getAllCities() {
    this.usersService.getCities().subscribe(
      (data: any) => {
        this.cities = data
      }
    )
  }

  selectItem(value) {
    this.select.emit(value);
    this.selectedCity = +value;
    this.profileBuilder.address.city = +value;
  }

  checkAvoidness(e: any, avoid: number) {
    debugger;
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
    debugger;
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
