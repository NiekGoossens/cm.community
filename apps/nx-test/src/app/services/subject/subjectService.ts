import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from '../../../subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  readonly subjects: Subject[] = [
    {
      id: 1,
      name: 'Frontend',
      description: 'Frontend is a subject',
      image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Become_a_Front_End_Developer.jpg'

    },
    {
      id: 2,

      name: 'Backend',
      description: 'Backend is a subject',
      image: 'https://www.wponderhoud.nl/wp-content/uploads/2021/05/backend-developer.jpg'
    },
    {
      id: 3,

      name: 'NoSQL',
      description: 'NoSQL is a subject',
      image: 'https://miro.medium.com/max/691/1*WFLzviMfxbQSYPyIYuG4MQ.png'
    },
    {
      id: 4,
      name: 'SQL',
      description: 'SQL is a subject',
      image: 'https://futurelinx.fr/wp-content/uploads/2020/01/SQL.png',
    },
    {
      id: 5,
      name: 'ux',
      description: 'ux is a subject',
      image: 'https://celesttechnologies.com/assets/images/blog/Different-Between-UI-UX.png'
    },

  ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getSubjects(): Subject[] {
    console.log('getSubjects aangeroepen');
    return this.subjects;
  }

  getSubjectsAsObservable(): Observable<Subject[]> {
    console.log('getSubjectsAsObservable aangeroepen');
    return of(this.subjects);
  }

  getSubjectById(id: number): Subject {
    console.log('getSubjectById aangeroepen');
    return this.subjects.filter((subject) => subject.id === id)[0];
  }
  addSubject(subject: Subject): void {
    console.log('addSubject aangeroepen');
    this.subjects.push(subject);
  }
  deleteSubject(id: number): void {
    console.log('deleteSubject aangeroepen');
    this.subjects.splice(this.subjects.findIndex((subject) => subject.id === id), 1);
  }
  updateSubject(subject: Subject): void {
    console.log('updateSubject aangeroepen');
    this.subjects.splice(this.subjects.findIndex((s) => s.id === subject.id), 1, subject);
  }
  getHighestId(): number {
    console.log('getHighestId aangeroepen');
    return Math.max(...this.subjects.map((subject) => subject.id));
  }
}
