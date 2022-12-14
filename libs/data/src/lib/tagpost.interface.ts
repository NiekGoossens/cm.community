import { PostModel } from './post.interface';
import { TagModel } from './tag.interface';

export interface TagpostModel {
  postID: PostModel['postID'];
  tagID: TagModel['tagID'];
}
