import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../user';
import { UserService } from '../../../services/user/userService';
import { NgForm } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userId: string | null = null;
  isEdit = false;
  user: User = {

    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    followedWorkshops: [],
    amountOfPayedWorkshops: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.user = new User();
    });
  }

  onSubmit(userForm: NgForm) {

    //e

    const newUser = {
      id: this.userService.getHighestId() + 1,
      ...userForm.value
    };
    this.userService.addUser(newUser);


    this.router.navigate(['users']);
  }

  save() {
    console.log('Hier komt je save actie');
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}