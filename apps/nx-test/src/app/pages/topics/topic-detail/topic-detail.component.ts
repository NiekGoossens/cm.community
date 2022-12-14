import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Topic, TopicType } from 'apps/nx-test/src/topic';
import { TopicService } from '../../../services/topic/topicService';

@Component({
  selector: 'nx-test-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
})
export class TopicDetailComponent implements OnInit {
  topidId: string | null = null;
  topic: Topic = {
    id: 0,
    title: '',
    content: '',
    type: TopicType.TEXT,
    chapters: [],
  }
  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.topic = this.topicService.getTopicById(Number(params.get('tid')));
    });
  }
}

