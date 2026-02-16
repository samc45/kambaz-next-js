export type PostType = "question" | "note";

export interface Post {
  id: string;
  type: PostType;
  title: string;
  author: string;
  body: string;
  folders: string[];
  createdAt: Date;
  updatedAt: Date;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  author: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}