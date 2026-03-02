"use client";

import { useEffect, useState } from "react";
import { Answer, FollowUpDiscussion, FollowUpReply, Post } from "../../types";
import FollowUpDiscussionComponent from "./FollowUpDiscussion";
import InstructorAnswer from "./InstructorAnswer";
import PostDetails from "./PostDetails";
import StudentAnswer from "./StudentAnswer";
import { randomUUID } from "crypto";

function addReplyToTree(
  replies: FollowUpReply[],
  parentReplyId: string,
  replyToAdd: FollowUpReply
): FollowUpReply[] {
  return replies.map((reply) => {
    if (reply.id === parentReplyId) {
      return {
        ...reply,
        replies: [...(reply.replies ?? []), replyToAdd],
      };
    }

    if (!reply.replies?.length) {
      return reply;
    }

    return {
      ...reply,
      replies: addReplyToTree(reply.replies, parentReplyId, replyToAdd),
    };
  });
}

export default function PostScreen(post: Post) {
  const [followUpDiscussions, setFollowUpDiscussions] = useState<FollowUpDiscussion[]>([]);

  useEffect(() => {
    setFollowUpDiscussions(post.followUpDiscussions);
    console.log("PostScreen loaded followUpDiscussions:", post.followUpDiscussions);
  }, [post]);

  const exampleInstructorAnswer: Answer = {
    id: "ans1",
    author: "Some Instr",
    body: "test",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isInstructor: true
  }

  const exampleStudentAnswer: Answer = {
    id: "ans2",
    author: "Some Student",
    body: "ok",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isInstructor: false
  }

  const handleAddDiscussion = (text: string) => {
    setFollowUpDiscussions((current) => [
      ...current,
      {
        id: `fud-${randomUUID()}`,
        author: "Current User",
        body: text,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        resolved: false,
        replies: [],
      },
    ]);
  };

  const handleAddReply = (discussionId: string, parentReplyId: string | null, text: string) => {
    const newReply: FollowUpReply = {
      id: `reply-${randomUUID()}`,
      author: "Current User",
      body: text,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      replies: [],
    };

    setFollowUpDiscussions((current) =>
      current.map((discussion) => {
        if (discussion.id !== discussionId) {
          return discussion;
        }

        if (!parentReplyId) {
          return {
            ...discussion,
            replies: [...discussion.replies, newReply],
            updatedAt: new Date().toDateString(),
          };
        }

        return {
          ...discussion,
          replies: addReplyToTree(discussion.replies, parentReplyId, newReply),
          updatedAt: new Date().toDateString(),
        };
      })
    );
  };

  const handleToggleResolved = (discussionId: string, resolved: boolean) => {
    setFollowUpDiscussions((current) =>
      current.map((discussion) =>
        discussion.id === discussionId
          ? { ...discussion, resolved, updatedAt: new Date().toDateString() }
          : discussion
      )
    );
  };

  return (
    <div className="p-2">
      <PostDetails
        type={"question"}
        title={"My assignment is not showing as graded"}
        author={"John Doe"}
        body={"hello so for some reason on canvas it says that my assignment is not graded but i submitted it on time"}
        folders={["hw1"]}
      />

      {post.type !== "note" && (
        <StudentAnswer
          isNewAnswer={false}
          answer={exampleStudentAnswer}
          onChange={() => { }}
        />
      )}

      {!post.instructorAnswered && (
        <InstructorAnswer
          isNewAnswer={true}
          answer={exampleInstructorAnswer}
          onChange={() => { }}
        />
      )}

      <FollowUpDiscussionComponent
        discussions={followUpDiscussions}
        onAddDiscussion={handleAddDiscussion}
        onAddReply={handleAddReply}
        onToggleResolved={handleToggleResolved}
      />

    </div>
  )
}