import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../user';
import { UserService } from '../../../services/user/userService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  user: User | null = null;
  userId: string | null = null;
  isStudent = false;
  isOwner = false;
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.user = this.userService.getUserById(Number(this.userId));
    });

    this.getUserFromLocalStorage();
    if (this.localUser.role === 'admin') {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }

  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

}
