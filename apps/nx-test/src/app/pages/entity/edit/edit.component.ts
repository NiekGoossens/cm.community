import { Component, OnInit } from '@angular/core';
import { User } from '../../../../user';

import { UserService } from '../../../services/user/userService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
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
  userOld: User = {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    amountOfPayedWorkshops: 0,
    followedWorkshops: []

  }
  isEdit = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit(): void {


    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        // Bestaande user
        this.user = this.userService.getUserById(Number(this.userId));
        this.userOld = { ...this.user };
      } else {
        // Nieuwe user
        this.user = new User();
      }
    });


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
    this.userService.updateUser(this.userOld);
    this.router.navigate(['users']);
  }

  delete(id: number) {
    this.userService.deleteUser(id);
    this.router.navigate(['users']);
  }

}
