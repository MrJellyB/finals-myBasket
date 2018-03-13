import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  // The auth guard is used to prevent unauthenticated users from accessing restricted routes,
  // it's used in app.routing.ts to protect the home page route.
  // For more information about angular 2 guards you can check out this post on the thoughtram blog
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
