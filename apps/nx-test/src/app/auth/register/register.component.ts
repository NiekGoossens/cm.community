import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/userService';
import { LoggedInAuthGuard } from '../auth.guards';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: LoggedInAuthGuard) {

  }


  userId: string | null = null;
  user: User = {
    id: -0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  };

  loginForm: FormGroup | undefined;
  subs: Subscription | undefined;
  submitted = false;

  ngOnInit(): void {
    this.user = new User();
  }


  onSubmit(userForm: NgForm) {
    const newUser = this.user;
    newUser.id = this.userService.getHighestId();
    newUser.firstName = userForm.value.firstName;
    newUser.lastName = userForm.value.lastName;
    newUser.email = userForm.value.email;
    newUser.password = userForm.value.password;
    this.userService.addUser(newUser);
    this.authService.login();
    this.saveUserToLocalStorage(newUser);
    this.router.navigate(['/subjects']);

  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('cookie', JSON.stringify(user));
  }


}
