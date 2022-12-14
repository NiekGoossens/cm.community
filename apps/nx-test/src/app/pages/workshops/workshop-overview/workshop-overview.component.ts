import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { Workshop } from '../../../../workshop';
import { WorkshopService } from '../../../services/workshop/workshopService';
import { UserService } from '../../../services/user/userService';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-workshop-overview',
  templateUrl: './workshop-overview.component.html',
  styleUrls: ['./workshop-overview.component.css']
})
export class WorkshopOverviewComponent {

  constructor(private workshopService: WorkshopService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }
  workshops: Workshop[] = [
    {
      id: 1,
      name: 'Workshop 1',
      uploadDate: new Date(),
      isFree: true,
      requiredTools: [],
      description: 'Description 1',
      subjectId: 1,
      image: '',
      topics: [],
      owner: 1,
    },
  ];

  highestId = 0;
  isStudent = true;
  localUser: User = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'no',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  };

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    

    if (this.localUser.role === 'student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }


    // const workshops = this.workshopService.getWorkshopsBySubjectId(sid);
    // this.workshops = [{
    //   id: 1,
    //   name: 'Workshop 1',
    //   uploadDate: new Date(),
    //   isFree: true,
    //   requiredTools: [],
    //   description: 'Description 1',
    //   subjectId: 1,
    //   image: '',
    //   topics: [],
    //   owner: 1,
    // }];

    // this.workshops = this.workshopService.getWorkshopsBySubjectId(sid);
    // this.workshops = this.workshopService.getWorkshopsBySubjectId(Number(this.route.snapshot.paramMap.get('sid')));

    this.route.paramMap.subscribe((params) => {
      this.workshops = this.workshopService.getWorkshopsBySubjectId(Number(params.get('sid')));
    });
    // this.workshops = this.workshopService.getWorkshops();
    this.highestId = this.workshopService.getHighestId() + 1;
  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

  openWorkshop(id: number) {

    console.log(id);
    if (this.localUser.followedWorkshops.includes(id) || this.localUser.role === 'admin' || this.workshopService.getWorkshopById(id).isFree && this.localUser.role !== 'no' ) {
      this.router.navigate(["./" + id + "/topic"], { relativeTo: this.route });
    }else {
      alert("You have to login and buy this workshop to access it");
    }
  }

  buyWorkshop(id: number) {

    console.log(id);
    if (this.localUser.id === -1) {
      alert("You have to be logged in to buy a workshop");
    } else if (this.localUser.amountOfPayedWorkshops < this.localUser.followedWorkshops.length) {
      this.localUser.followedWorkshops.push(id);
      this.userService.addWorkshopToUser(this.localUser.id, id);
      localStorage.setItem('cookie', JSON.stringify(this.localUser));
      this.router.navigate(["./" + id + "/topic"], { relativeTo: this.route });
    } else {
      alert("You have reached the maximum amount of payed workshops");
    }
  }
}



