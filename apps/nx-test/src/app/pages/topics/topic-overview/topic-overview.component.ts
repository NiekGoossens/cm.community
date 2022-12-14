import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Topic } from 'apps/nx-test/src/topic';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'apps/nx-test/src/user';
import { TopicService } from '../../../services/topic/topicService';
import { WorkshopService } from '../../../services/workshop/workshopService';
import { Workshop } from '../../../../workshop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-topics',
  templateUrl: './topic-overview.component.html',
  styleUrls: ['./topic-overview.component.css'],
})
export class TopicOverviewComponent implements OnInit {
  constructor(private topicService: TopicService, private route: ActivatedRoute, private workshopService: WorkshopService) { }
  topics: Topic[] = [];
  topicIds: number[] = [];
  highestId = 0;
  isStudent = true;
  canEdit = false;
  workshop: Workshop = {
    id: 0,
    name: '',
    description: '',
    subjectId: 0,
    uploadDate: new Date(),
    isFree: false,
    requiredTools: [],
    image: '',
    topics: [],
    owner: 0,

  };

  localUser: User = {
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
    this.route.paramMap.subscribe((params) => {
      this.workshop = this.workshopService.getWorkshopById(Number(params.get('id')));
    });
    this.getUserFromLocalStorage();
    if (this.localUser.id === this.workshop.owner || this.localUser.role === 'admin') {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }

    this.route.paramMap.subscribe((params) => {
      this.topicIds = this.workshopService.getTopicsByWorkshopId(Number(params.get('id')));
    });
    this.topics = this.topicService.getTopicsByIds(this.topicIds);
    this.highestId = this.topicService.getHighestId();
  }

  getUserFromLocalStorage() {
    const cookie = localStorage.getItem('cookie');
    if (cookie) {
      this.localUser = JSON.parse(cookie);
    }
  }

}

