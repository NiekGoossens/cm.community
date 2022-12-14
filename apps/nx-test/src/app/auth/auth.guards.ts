import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  Route,
  UrlSegment,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../user';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }


  public LoggedIn = new BehaviorSubject<boolean>(false);

  public notifyOther(data: boolean) {
    if (data) {
      this.LoggedIn.next(data);
    }
  }

  login() {
    this.LoggedIn.next(true);
    this.notifyOther(true);
  }

  logOut() {
    localStorage.removeItem('cookie');
    this.LoggedIn.next(false);
    this.notifyOther(false);
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let currentUser: User = {
      id: -0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      amountOfPayedWorkshops: 0,
      followedWorkshops: [],
    }
    currentUser = JSON.parse(localStorage.getItem('cookie') || '');
    if (currentUser.id && currentUser.id > 0) {

      const userRole = currentUser.role;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['subjects ']);
        return false;
      }
      return true;
    }

    return true;
  }

}
