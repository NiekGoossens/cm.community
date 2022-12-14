import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Topic, TopicType } from '../../../topic';

@Injectable({
    providedIn
        : 'root',
})
export class TopicService {
    readonly topics: Topic[] = [
        {
            id: 1,
            title: 'Les 1',
            content: `<div> 
            <p>Deze les gaat over de basis van Angular</p> 
            <img src=\"assets/images/person.png\" class=\"card-img-top rounded-circle border profile-pic px-4 py-4 placeholder-glow \"alt=\"...\" />
            </div> 
            
            `,
            type: TopicType.TEXT,
            chapters: ['1.1 Forms', '1.2 HTTP', '1.3 Observables'],
        },
        {
            id: 2,
            title: 'Les 2',
            content: `<div> 
            <p>Deze les gaat over de basis van Angular</p>
            
            </div>
            `,
            type: TopicType.TEXT,
            chapters: ['2.1 Routing', '2.2 Components', '2.3 Services'],
        },
        {
            id: 3,
            title: 'Les 3',
            content: `<div>
            <div>
            <p>Deze les is een beetje saai</p>
            </div>
            </div>
            `,
            type: TopicType.TEXT,
            chapters: ['3.1 Forms', '3.2 HTTP', '3.3 Observables'],
        },
        {
            id: 4,
            title: 'Les 4',
            content: `<div>
            <p> 
            Welcome to Angular!

This tutorial introduces you to the essentials of Angular by walking you through building an e-commerce site with a catalog, shopping cart, and check-out form.

To help you get started right away, this tutorial uses a ready-made application that you can examine and modify interactively on StackBlitz —without having to set up a local work environment. StackBlitz is a browser-based development environment where you can create, save, and share projects using a variety of technologies.
            </p></div>`,
            type: TopicType.TEXT,
            chapters: ['4.1 Forms', '4.2 HTTP', '4.3 Observables'],
        },
        {
            id: 5,
            title: 'Les 5',
            content: `<div>
            <p>
            Welcome to Angular!
            </p>
            </div>
            <div>
            With *ngFor, the <div> repeats for each product in the list.

Structural directives shape or reshape the DOM's structure, by adding, removing, and manipulating elements. For more information about structural directives, see 
<a href="https://github.com/Niekelodius">github</a>.
            </div>
            `,
            type: TopicType.TEXT,
            chapters: ['5.1 Forms', '5.2 HTTP', '5.3 Observables'],
        },
        {
            id: 6,
            title: 'Les 6',
            content: `<div>
            <p>
            link
            </p>
            </div>
            `,
            type: TopicType.VIDEO,
            chapters: ['6.1 Forms', '6.2 HTTP', '6.3 Observables'],
        },
    ];
    constructor() {
        console.log('Service constructor aangeroepen');
    }
    getTopicsByIds(ids: number[]): Topic[] {
        console.log('getTopicsByIds aangeroepen');
        return this.topics.filter((topic) => ids.includes(topic.id));
    }
    getTopics(): Topic[] {
        console.log('getTopics aangeroepen');
        return this.topics;
    }
    getTopicsAsObservable(): Observable<Topic[]> {
        console.log('getTopicsAsObservable aangeroepen');
        // 'of' is een rxjs operator die een Observable
        // maakt van de gegeven data.
        return of(this.topics);
    }
    getTopicById(id: number): Topic {
        console.log('getTopicById aangeroepen');
        return this.topics.filter((topic) => topic.id === id)[0];
    }
    updateTopic(topic: Topic): void {
        console.log('updateTopic aangeroepen');
        this.topics.filter((t) => t.id === topic.id)[0] = topic;
    }
    addTopic(topic: Topic): void {
        console.log('addTopic aangeroepen');
        this.topics.push(topic);
    }
    deleteTopic(id: number): void {
        console.log('deleteTopic aangeroepen');
        const index = this.topics.findIndex((t) => t.id === id);
        this.topics.splice(index, 1);
    }
    getHighestId(): number {
        console.log('getHighestId aangeroepen');
        return Math.max(...this.topics.map((topic) => topic.id));
    }
    getTopicTypeById(id: number): TopicType {
        console.log('getTopicTypeById aangeroepen');
        return this.topics.filter((topic) => topic.id === id)[0].type;
    }

}

