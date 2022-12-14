import { CommentModel } from './comment.interface';
import { PostModel } from './post.interface';

export interface CommentpostModel {
  postID: PostModel['postID'];
  commentID: CommentModel['commentID'];
}
