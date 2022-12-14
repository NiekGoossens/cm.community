import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { UserService } from '../../services/user/userService';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavComponent } from '../../shared/nav/nav.component';
import { LoggedInAuthGuard } from '../auth.guards';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  CURRENT_USER: string | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: LoggedInAuthGuard) {

  }
  userId: string | null = null;
  user: User = {
    id: -0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
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
    console.log('test');
    const user = this.userService.getUserByEmail(userForm.value.email);



    if (user != null) {
      if (user.password === userForm.value.password) {
        this.saveUserToLocalStorage(user);

        this.router.navigate(['/subjects']).then(() => {
          this.authService.login();
        });
      } else {
        alert('Wrong password');
      }
    } else {
      alert('User not found');
    }

  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('cookie', JSON.stringify(user));
  }


}


