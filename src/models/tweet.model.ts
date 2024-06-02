import { User } from "./user.model";

export interface Tweet {
    id: number
    title: string;
    content: string;
    author: User;
}

export interface SharedWithMeTweet {
    id: number;
    sharedUser?: User;
    sharedPost?: Tweet;
  }