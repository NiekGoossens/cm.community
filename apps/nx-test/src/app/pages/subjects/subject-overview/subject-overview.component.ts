import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { Subject } from '../../../../subject';
import { SubjectService } from '../../../services/subject/subjectService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-dashboard',
  templateUrl: './subject-overview.component.html',
  styleUrls: ['./subject-overview.component.css']
})
export class SubjectOverviewComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }
  hasAccess = false;
  subjects: Subject[] = [];
  highestId = 0;
  canEdit = false;
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

  ngOnInit(): void {
    this.subjects = 
    this.subjects = this.subjectService.getSubjects();
    this.highestId = this.subjectService.getHighestId() + 1;
    this.getUserFromLocalStorage();
    if (this.user.role === 'admin') {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }


  }
  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.user = JSON.parse(cookie);
    }
  }
}
