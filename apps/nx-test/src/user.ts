export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  amountOfPayedWorkshops: number;
  followedWorkshops: number[];

  constructor(
    id: number = 0,
    firstName: string = '',
    lastName: string= '',
    email: string = '',
    role: string = '',
    password: string = '',
    amountOfPayedWorkshops: number = 0,
    followedWorkshops: number[] = []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.password = password;
    this.amountOfPayedWorkshops = amountOfPayedWorkshops;
    this.followedWorkshops = followedWorkshops;
  }
}
