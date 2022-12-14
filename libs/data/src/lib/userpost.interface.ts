import { PostModel } from './post.interface';
import { UserModel } from './user.interface';

export interface Model {
  userEmail: UserModel['userEmail'];
  postID: PostModel['postID'];
}
