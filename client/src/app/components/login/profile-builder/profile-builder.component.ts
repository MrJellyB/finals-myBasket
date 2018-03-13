import { Component } from '@angular/core';
import { ProfileBuilder } from '../../../interface/entities.interface';

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent {
  public profileBuilder: ProfileBuilder;
  constructor() { }

  ngOnInit() {
    debugger;
    this.profileBuilder = <ProfileBuilder>{};
  }

  saveProfileBuilder() {
  }
}
