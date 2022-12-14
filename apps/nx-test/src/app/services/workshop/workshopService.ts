import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Workshop } from '../../../workshop';

@Injectable({
    providedIn: 'root',
})
export class WorkshopService {
    readonly workshops: Workshop[] = [
        {
            id: 1,
            name: 'Javascript',
            description: 'Javascript is a subject',
            uploadDate: new Date(),
            isFree: true,
            requiredTools: ['Visual Studio Code', 'Node.js', 'NPM', 'Git'],


            image: 'https://www.tutorialrepublic.com/lib/images/javascript-illustration.png',
            subjectId: 1,
            topics: [1, 2, 3, 4, 5, 6],
            owner: 4

        },
        {
            id: 2,

            name: 'Angular',
            description: 'Angular is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Visual Studio Code', 'Node.js', 'NPM', 'Git'],
            image: 'data:image/png;base64,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',
            subjectId: 1,
            topics: [1, 2, 5],
            owner: 2
        },
        {
            id: 3,

            name: 'Typescript',
            description: 'Typescript is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Visual Studio Code', 'Node.js', 'NPM', 'Git'],
            image: 'https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png',
            subjectId: 1,
            topics: [1, 2, 4,],
            owner: 4
        },
        {
            id: 4,
            name: 'MongoDB',
            description: 'MongoDB is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['MongoDB Compass', 'MongoDB Atlas'],
            image: 'https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png',
            subjectId: 3,
            topics: [1, 2],
            owner: 2
        },
        {
            id: 5,
            name: 'MySQL',
            description: 'MySQL is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['MySQL Workbench', 'MySQL Server'],
            image: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
            subjectId: 4,
            topics: [1, 2],
            owner: 2
        },
        {
            id: 6,
            name: 'C#',
            description: 'C# is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Visual Studio', 'Git'],
            image: 'https://www.avenga.com/wp-content/uploads/2020/11/C-Sharp.png',
            subjectId: 2,
            topics: [1, 2, 3],
            owner: 2
        },
        {
            id: 7,
            name: 'Java',
            description: 'Java is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Visual Studio Code'],
            image: 'https://www.ovsoftware.nl/wp-content/uploads/2018/04/Java.png',
            subjectId: 2,
            topics: [1, 2, 3],
            owner: 2
        },
        {
            id: 8,
            name: 'Balsamiq',
            description: 'Balsamiq is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Balsamiq'],
            image: 'https://cdn.dribbble.com/users/2921305/screenshots/5693389/media/021f2908b3f3eb0a47abb37dfe984db4.jpg?compress=1&resize=400x300',
            subjectId: 5,
            topics: [1, 2, 3],
            owner: 4
        },
        {
            id: 9,
            name: 'bootstrap',
            description: 'bootstrap is a subject',
            uploadDate: new Date(),
            isFree: false,
            requiredTools: ['Visual Studio Code'],
            image: 'https://blog.templatetoaster.com/wp-content/uploads/2019/09/What-is-Bootstrap-Facebook.png',
            subjectId: 5,
            topics: [1, 2, 3],
            owner: 2
        },
    ];

    constructor() {
        console.log('Service constructor aangeroepen');
    }

    getWorkshops(): Workshop[] {
        console.log('getWorkshops aangeroepen');
        return this.workshops;
    }

    getWorkshopsAsObservable(): Observable<Workshop[]> {
        console.log('getWorkshopsAsObservable aangeroepen');
        return of(this.workshops);
    }

    getWorkshopById(id: number): Workshop {
        console.log('getWorkshopById aangeroepen');
        return this.workshops.filter((workshops) => workshops.id === id)[0];
    }
    getWorkshopsBySubjectId(subjectId: number): Workshop[] {
        console.log('getWorkshopsBySubjectId aangeroepen');
        return this.workshops.filter((workshops) => workshops.subjectId === subjectId);
    }
    AddWorkshop(workshop: Workshop) {
        console.log('AddWorkshop aangeroepen');
        this.workshops.push(workshop);
    }
    updateWorkshop(workshop: Workshop) {
        console.log('updateWorkshop aangeroepen');
        const index = this.workshops.findIndex((w) => w.id === workshop.id);
        this.workshops[index] = workshop;
    }
    deleteWorkshop(id: number) {
        console.log('deleteWorkshop aangeroepen');
        const index = this.workshops.findIndex((w) => w.id === id);
        this.workshops.splice(index, 1);
    }
    getHighestId(): number {
        console.log('getHighestId aangeroepen');
        let highestId = 0;
        this.workshops.forEach((workshop) => {
            if (workshop.id > highestId) {
                highestId = workshop.id;
            }
        });
        return highestId;
    }
    getTopicsByWorkshopId(workshopId: number): number[] {
        console.log('getTopicsByWorkshopId aangeroepen');
        const workshop = this.workshops.filter((w) => w.id === workshopId)[0];
        return workshop.topics;
    }

    addTopicToWorkshop(workshopId: number, topicId: number) {
        console.log('addTopicToWorkshop aangeroepen');
        const workshop = this.workshops.filter((w) => w.id === workshopId)[0];
        workshop.topics.push(topicId);
    }
    removeTopicFromWorkshop(workshopId: number, topicId: number) {
        console.log('removeTopicFromWorkshop aangeroepen');
        const workshop = this.workshops.filter((w) => w.id === workshopId)[0];
        const index = workshop.topics.findIndex((t) => t === topicId);
        workshop.topics.splice(index, 1);
    }

}
