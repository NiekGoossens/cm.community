import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { UserService } from '../../services/user/userService';
import { ActivatedRoute } from '@angular/router';
import { LoggedInAuthGuard } from '../../auth/auth.guards';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private auth: LoggedInAuthGuard) { }
  authGuard = this.auth;
  LoggedIn = false;
  localUser: User = {
    id: -0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  };




  ngOnInit(): void {
    this.localUser = {
      id: -0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'student',
      amountOfPayedWorkshops: 0,
      followedWorkshops: [],
    };
    this.authGuard.LoggedIn.subscribe((data: boolean) => {
      this.LoggedIn = data
    });
    this.getUserFromLocalStorage();

  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }

  }

  logOut() {
    localStorage.removeItem('cookie');
    this.authGuard.logOut();
    this.ngOnInit();

  }
}
