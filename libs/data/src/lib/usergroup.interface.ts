import { GroupModel } from './group.interface';
import { UserModel } from './user.interface';

export interface UsergroupModel {
  groupID: GroupModel['groupID'];
  userEmail: UserModel['userEmail'];
}
