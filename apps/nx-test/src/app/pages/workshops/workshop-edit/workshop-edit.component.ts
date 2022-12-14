import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../../../../workshop';
import { WorkshopService } from '../../../services/workshop/workshopService';
import { NgForm } from '@angular/forms';
import { User } from '../../../../user';
import { UserService } from '../../../services/user/userService';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-workshop-edit',
  templateUrl: './workshop-edit.component.html',
  styleUrls: ['./workshop-edit.component.css']
})
export class WorkshopEditComponent {
  constructor(private workshopService: WorkshopService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }
  // productForm: FormGroup;
  isEdit = true;
  subjectId: string | null = null;

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

  workshopId: string | null = null;
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

  localUser: User = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    amountOfPayedWorkshops: 0,
    followedWorkshops: [],
  };

  highestId = 0;

  ngOnInit(): void {

    this.getUserFromLocalStorage();
    this.workshopId = this.route.snapshot.paramMap.get('id');
    this.subjectId = this.route.snapshot.paramMap.get('sid');
    if (this.workshopId != null && this.workshopId != 'new') {
      this.workshop = this.workshopService.getWorkshopById(Number(this.workshopId));
    } else {
      this.isEdit = false;
      this.workshop = new Workshop();
      this.workshop.uploadDate = new Date();
      this.workshop.subjectId = Number(this.subjectId);
      this.workshop.id = this.workshopService.getHighestId() + 1;
      this.workshop.isFree = false;
      this.workshop.requiredTools = [""];
      this.workshop.topics = [1];
      this.workshop.description = "";
      this.workshop.image = "";
      this.workshop.name = "";
      this.workshop.owner = 0;

    }

    this.user = this.userService.getUserById(Number(this.workshop.owner));
    // this.route.paramMap.subscribe((params) => {
    //   this.user = this.userService.getUserById(Number(this.workshop.owner));
    // });


    // this.route.paramMap.subscribe((params) => {
    //   this.workshopId = params.get('id');
    //   this.subjectId = params.get('sid');
    //   if (this.workshopId != null && this.workshopId != 'new') {
    //     this.workshop = this.workshopService.getWorkshopById(Number(this.workshopId));
    //   } else {
    //     this.isEdit = false;
    //     this.workshop = new Workshop();
    //     this.workshop.uploadDate = new Date();
    //     this.workshop.subjectId = Number(params.get('sid'));
    //     this.workshop.id = this.workshopService.getHighestId() + 1;
    //     this.workshop.isFree = false;
    //     this.workshop.requiredTools = [""];
    //     this.workshop.topics = [1];
    //     this.workshop.description = "";
    //     this.workshop.image = "";
    //     this.workshop.name = "";
    //     this.workshop.owner = 0;

    //   }

    //   this.route.paramMap.subscribe((params) => {
    //     this.user = this.userService.getUserById(Number(this.workshop.owner));
    //   });


    // });
  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

  onSubmit(userForm: NgForm) {
    if (this.isEdit) {
      this.workshop = userForm.value;
      this.workshopService.updateWorkshop(userForm.value)
      if(userForm.value.id === -1)  {
        return true;
      }else{
      this.router.navigate(['../../'], { relativeTo: this.route });
      return true;
      }
    } else {
      const newWorkshop = {
        id: this.workshopService.getHighestId() + 1,
        topics: [0],
        name: userForm.value.name,
        uploadDate: new Date(),
        isFree: userForm.value.isFree,
        requiredTools: userForm.value.requiredTools,
        description: userForm.value.description,
        subjectId: Number(this.subjectId),
        image: userForm.value.image,
        owner: this.localUser.id

        // ...userForm.value
      };
      this.userService.addCreditToUser(this.localUser.id, 1);
      this.userService.addWorkshopToUser(this.localUser.id, newWorkshop.id);
      this.workshopService.AddWorkshop(newWorkshop);
      this.router.navigate(['../../' + newWorkshop.id + '/topic'], { relativeTo: this.route });
      return true;
    }


  }

  delete(id: number) {
    this.workshopService.deleteWorkshop(id);
    this.workshop = new Workshop();
    this.workshop.id = -2;
    if(id === -2)  {
      return true;
    }else{
    this.router.navigate(['../../'], { relativeTo: this.route });
    return true;
    }
  }

  cancel() {
    console.log('Hier komt je cancel actie');
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  addTool() {
    if (this.workshop.requiredTools == null) {
      this.workshop.requiredTools = [];
    }
    this.workshop.requiredTools.push('');
    return true;
  }

  removeTool(index: number) {

    this.workshop.requiredTools.splice(index, 1);
    return true;
  }
}
