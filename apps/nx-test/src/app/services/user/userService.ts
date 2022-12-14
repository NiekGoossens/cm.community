import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      role: 'admin',
      password: '1234',
      amountOfPayedWorkshops: 0,
      followedWorkshops: [],
    },
    {
      id: 2,
      firstName: 'Doe',
      lastName: 'John',
      email: 'doe@gmail.com',
      role: 'teacher',
      password: '23',
      amountOfPayedWorkshops: 2,
      followedWorkshops: [1, 2],
    },
    {
      id: 3,
      firstName: 'Donny',
      lastName: 'Joe',
      email: 'Donny@gmail.com',
      role: 'student',
      password: 'ga12',
      amountOfPayedWorkshops: 0,
      followedWorkshops: [],
    },
    {
      id: 4,
      firstName: 'Johny',
      lastName: 'Joe',
      email: 'jojo@mail.com',
      role: 'admin',
      password: '1234',
      amountOfPayedWorkshops: 0,
      followedWorkshops: [],
    },
  ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): User[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<User[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(id: number): User {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user.id === id)[0];
  }
  addUser(user: User) {
    this.users.push(user);
  }

  updateUser(user: User) {
    this.users.forEach(u => {
      if (u.id == user.id) {
        u = user
      }
    });
  }

  getHighestId(): number {
    let highestId = 0;
    this.users.forEach(user => {
      if (user.id > highestId) {
        highestId = user.id;
      }
    });
    return highestId;
  }
  deleteUser(id: number) {
    this.users.forEach(u => {
      if (u.id == id) {
        this.users.splice(this.users.indexOf(u), 1);
      }
    });
  }
  getUserByEmail(email: string): User {
    return this.users.filter((user) => user.email === email)[0];
  }
  addWorkshopToUser(userId: number, workshopId: number) {
    this.users.forEach(user => {
      if (user.id == userId) {
        user.followedWorkshops.push(workshopId);
      }
    });
  }

  addCreditToUser(userId: number, amount: number) {
    this.users.forEach(user => {
      if (user.id == userId) {
        user.amountOfPayedWorkshops += amount;
      }
    });
  }
}
