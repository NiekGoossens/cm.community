import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';

import { UserService } from '../../services/user/userService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  isStudent = false;
  isOwner = false;
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

  isEdit = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.getUserFromLocalStorage();
    this.userId = this.localUser.id.toString();
    if (this.localUser.email === '') {
      this.router.navigate(['login']);
    } else {
      this.route.paramMap.subscribe((params) => {
        this.localUser = this.userService.getUserById(Number(this.localUser.id));
      });
    }

  }




  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

  onSubmit(userForm: NgForm) {
    if (this.isEdit) {
      this.userService.updateUser(userForm.value)
    } else {
      const newUser = {
        id: this.userService.getUsers().length,
        ...userForm.value
      };
      this.userService.addUser(newUser);
    }

    this.router.navigate(['users']);
  }

  cancel() {
    console.log('Hier komt je cancel actie');
    this.router.navigate(['users']);
  }

  delete(id: number) {
    this.userService.deleteUser(id);
    this.router.navigate(['users']);
  }

}
