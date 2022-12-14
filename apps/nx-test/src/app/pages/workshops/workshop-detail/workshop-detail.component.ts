import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../../../../workshop';
import { WorkshopService } from '../../../services/workshop/workshopService';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { UserService } from '../../../services/user/userService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class WorkshopDetailComponent {
  constructor(private workshopService: WorkshopService, private route: ActivatedRoute, private userService: UserService) { }
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  };

  workshop: Workshop = {
    id: 0,
    name: '',
    uploadDate: new Date(),
    isFree: false,
    requiredTools: [],
    description: '',
    subjectId: 0,
    image: '',
    topics: [],
    owner: 0,

  };
  highestId = 0;

  ngOnInit(): void {
    this.workshop  = this.workshopService.getWorkshopById(Number(this.route.snapshot.paramMap.get('id')));
    // this.route.paramMap.subscribe((params) => {
    //   this.workshop = this.workshopService.getWorkshopById(Number(params.get('id')));
    // });
    this.user = this.userService.getUserById(Number(this.workshop.owner));
    // this.route.paramMap.subscribe((params) => {
    //   this.user = this.userService.getUserById(Number(this.workshop.owner));
    // });
  }
}
