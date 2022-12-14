export enum TopicType {
  TEXT = 'text',
  VIDEO = 'video',
  MEETING = 'meeting',
}

export class Topic {
  id: number;
  title: string;
  content: string;
  type: TopicType;
  chapters: string[];

constructor(
    id: number = 0,
    title: string = '',
    content: string = '',
    type: TopicType = TopicType.TEXT,
    chapters: string[] = []
    ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.type = type;
    this.chapters = chapters;
    }
}