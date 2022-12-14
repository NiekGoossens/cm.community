import { Injectable } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user/userService';
import { of } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User = {
    id: -0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  }
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  isLogin = false;

  role: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {

  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  login(value: string) {
    this.isLogin = true;
    this.role = value;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', this.role);
    return of({ success: this.isLogin, role: this.role });
  }

  logout() {
    this.isLogin = false;
    this.role = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.currentUser = JSON.parse(localStorage.getItem('cookie') || '');
    this.role = this.currentUser.role;
    // this.role = localStorage.getItem('ROLE') || '';
    return this.role;
  }
  // login(email: string, password: string): Observable<User> {
  //   console.log(`login at ${environment.SERVER_API_URL}auth/login`);

  //   return this.http
  //     .post<User>(
  //       `${environment.SERVER_API_URL}auth/login`,
  //       { email: email, password: password },
  //       { headers: this.headers }
  //     )
  //     .pipe(
  //       map((user) => {
  //         this.saveUserToLocalStorage(user);
  //         this.currentUser$.next(user);
  //         this.alertService.success('You have been logged in');
  //         return user;
  //       }),
  //       catchError((error: any) => {
  //         console.log('error:', error);
  //         console.log('error.message:', error.message);
  //         console.log('error.error.message:', error.error.message);
  //         this.alertService.error(error.error.message || error.message);
  //         return of(undefined);
  //       })
  //     );
  // }

  // register(userData: User): Observable<User> {
  //   console.log(`register at ${environment.SERVER_API_URL}users`);
  //   console.log(userData);
  //   return this.http
  //     .post<User>(`${environment.SERVER_API_URL}users`, userData, {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       map((user) => {
  //         // const user = new User(response);
  //         console.dir(user);
  //         this.saveUserToLocalStorage(user);
  //         this.currentUser$.next(user);
  //         this.alertService.success('You have been registered');
  //         return user;
  //       }),
  //       catchError((error: any) => {
  //         console.log('error:', error);
  //         console.log('error.message:', error.message);
  //         console.log('error.error.message:', error.error.message);
  //         this.alertService.error(error.error.message || error.message);
  //         return of(undefined);
  //       })
  //     );
  // }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  // validateToken(userData: User): Observable<User> {
  //   const url = `${environment.SERVER_API_URL}auth/profile`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + userData.token,
  //     }),
  //   };

  //   console.log(`validateToken at ${url}`);
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     map((response) => {
  //       console.log('token is valid');
  //       return response;
  //     }),
  //     catchError((error: any) => {
  //       console.log('Validate token Failed');
  //       this.logout();
  //       this.currentUser$.next(undefined);
  //       return of(undefined);
  //     })
  //   );
  // }

  // logout(): void {
  //   this.router
  //     .navigate(['/'])
  //     .then((success) => {
  //       // true when canDeactivate allows us to leave the page.
  //       if (success) {
  //         console.log('logout - removing local user info');
  //         localStorage.removeItem(this.CURRENT_USER);
  //         this.currentUser$.next(undefined);
  //         this.alertService.success('You have been logged out.');
  //       } else {
  //         console.log('navigate result:', success);
  //       }
  //     })
  //     .catch((error) => console.log('not logged out!'));
  // }

  // getUserFromLocalStorage(): Observable<User> {
  //   const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER));
  //   return of(localUser);
  // }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('cookie', JSON.stringify(user));
  }

  // userMayEdit(itemUserId: number): Observable<boolean> {
  //   return this.currentUser$.pipe(
  //     map((user: User) => (user ? user._id === itemUserId : false))
  //   );
  // }
}
