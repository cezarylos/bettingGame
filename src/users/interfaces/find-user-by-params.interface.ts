import { ObjectId } from 'bson';

export interface FindUserByParams {
  email?: string;
  _id?: ObjectId;
}
