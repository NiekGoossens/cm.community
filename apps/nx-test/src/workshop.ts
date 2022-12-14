import { Topic } from "./topic";

export class Workshop {
    id: number;
    name: string;
    uploadDate: Date;
    isFree: boolean;
    requiredTools: string[];
    description: string;
    subjectId: number;
    image: string;
    topics: number[];
    owner: number;



    constructor(
        id: number = 0,
        name: string = '',
        uploadDate: Date = new Date(),
        isFree: boolean = false,
        requiredTools: string[] = [],
        description: string = '',
        subjectId: number = 0,
        image: string = '',
        topics: number[] = [],
        owner: number = 0


    ) {
        this.id = id;
        this.name = name;
        this.uploadDate = uploadDate;
        this.isFree = isFree;
        this.requiredTools = requiredTools;
        this.description = description;
        this.subjectId = subjectId;
        this.image = image;
        this.topics = topics;
        this.owner = owner;
    }
}
