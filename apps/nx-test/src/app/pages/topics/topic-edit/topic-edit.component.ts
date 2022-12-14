import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Topic, TopicType } from 'apps/nx-test/src/topic';
import { TopicService } from '../../../services/topic/topicService';
import { NgForm } from '@angular/forms';
import { WorkshopService } from '../../../services/workshop/workshopService';


@Component({
  selector: 'nx-test-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css'],
})
export class TopicEditComponent implements OnInit {
  constructor(private topicService: TopicService, private route: ActivatedRoute, private router: Router, private workshopService: WorkshopService) { }
  isEdit = true;
  topicTypes = Object.values(TopicType);
  topicType = TopicType.TEXT;
  topic: Topic = {
    id: 0,
    title: '',
    content: '',
    type: TopicType.TEXT,
    chapters: [],
  }

  highestId = 0;
  currentId: string | null = null;
  workshopId = 0;



  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.currentId = params.get('tid');
      this.workshopId = Number(params.get('id'));
      if (this.currentId != null && this.currentId <= this.topicService.getHighestId().toString()) {
        this.topic = this.topicService.getTopicById(Number(this.currentId));
        this.topicType = this.topicService.getTopicTypeById(Number(this.currentId));

      } else {
        this.isEdit = false;
        this.topic = new Topic();
        this.topic.chapters = [];
        this.topic.id = this.topicService.getHighestId() + 1;
      }
    });
  }


  onSubmit(userForm: NgForm) {
    if (this.isEdit) {
      this.topicService.updateTopic(userForm.value)
    } else {
      const newTopic = {
        id: this.topicService.getHighestId() + 1,
        type: userForm.value.type,
        title: userForm.value.title,
        content: userForm.value.content,
        chapters: userForm.value.chapters
        // ...userForm.value
      };
      this.topicService.addTopic(newTopic);
      this.workshopService.addTopicToWorkshop(this.workshopId, newTopic.id);
    }
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  deleteTopic() {
    this.topicService.deleteTopic(this.topic.id);
    this.workshopService.removeTopicFromWorkshop(this.workshopId, this.topic.id);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  cancel() {
    console.log('Hier komt je cancel actie');
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  removeChapter(index: number) {
    this.topic.chapters.splice(index, 1);
  }

  addChapter() {
    if (this.topic.chapters == null) {
      this.topic.chapters = [];
    }
    this.topic.chapters.push('');
  }

}


