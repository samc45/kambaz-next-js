export type PostType = "question" | "note";

export interface Post {
  id: string;
  type: PostType;

  // content fields
  title: string;
  author: string;
  body: string;
  folders: string[];
  answers?: Answer[];

  // metadata for visual indicators
  instructorPosted: boolean;
  instructorEndorses: boolean;
  instructorAnswered: boolean;

  // date fields, stored as strings for serialization
  createdAt: string;
  updatedAt: string;

  // follow-up discussions
  followUpDiscussions: FollowUpDiscussion[];
}

export interface Answer {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isInstructor: boolean;
}

export interface FollowUpReply {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  replies?: FollowUpReply[];
}

export interface FollowUpDiscussion {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  resolved: boolean;
  replies: FollowUpReply[];
}