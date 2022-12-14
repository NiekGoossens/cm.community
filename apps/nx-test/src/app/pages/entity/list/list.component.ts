import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../user';
import { UserService } from '../../../services/user/userService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute,) { }
  users: User[] = [];
  highestId = 0;
  canEdit = false;
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
    this.getUserFromLocalStorage();
    if (this.localUser.role === 'admin') {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }

    this.route.paramMap.subscribe((params) => {
      this.users = this.userService.getUsers();
    });
    // this.workshops = this.workshopService.getWorkshops();
    this.highestId = this.userService.getHighestId() + 1;

  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

}
