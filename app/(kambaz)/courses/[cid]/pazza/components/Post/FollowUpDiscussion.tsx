"use client";

import "./answer.css";
import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { FollowUpDiscussion as FUDType, FollowUpReply } from "../../types";

function formatTimestamp(date: string) {
  return new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type DiscussionReplyProps = {
  discussionId: string;
  reply: FollowUpReply;
  level: number;
  onAddReply?: (discussionId: string, parentReplyId: string | null, text: string) => void;
};

function DiscussionReply({ discussionId, reply, level, onAddReply }: DiscussionReplyProps) {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    const text = replyText.trim();
    if (!text) return;
    onAddReply?.(discussionId, reply.id, text);
    setReplyText("");
  };

  return (
    <div className="mt-4" style={{ marginLeft: `${level * 20}px` }}>
      <div className="border-start ps-2">
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <div className="small text-muted">
              {reply.author} {formatTimestamp(reply.createdAt)}
            </div>
            <div className="mt-1" style={{ whiteSpace: "pre-wrap" }}>{reply.body}</div>
          </div>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="outline-secondary">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Form.Control
          as="textarea"
          rows={1}
          className="mt-2 pazza-textarea-smallest"
          placeholder="Reply to this reply"
          value={replyText}
          onChange={(event) => setReplyText(event.target.value)}
        />
        <div className="d-flex justify-content-end mt-2">
          <Button size="sm" onClick={handleReplySubmit}>Reply</Button>
        </div>
      </div>

      {reply.replies?.map((nestedReply) => (
        <DiscussionReply
          key={nestedReply.id}
          discussionId={discussionId}
          reply={nestedReply}
          level={level + 1}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
}

type FollowUpDiscussionProps = {
  discussions: FUDType[];
  onAddDiscussion?: (text: string) => void;
  onAddReply?: (discussionId: string, parentReplyId: string | null, text: string) => void;
  onToggleResolved?: (discussionId: string, resolved: boolean) => void;
};

export default function FollowUpDiscussion({
  discussions,
  onAddDiscussion,
  onAddReply,
  onToggleResolved,
}: FollowUpDiscussionProps) {
  const [newDiscussionText, setNewDiscussionText] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const handleAddDiscussion = () => {
    const text = newDiscussionText.trim();
    if (!text) return;
    onAddDiscussion?.(text);
    setNewDiscussionText("");
  };

  const handleAddDiscussionReply = (discussionId: string) => {
    const text = (replyDrafts[discussionId] ?? "").trim();
    if (!text) return;
    onAddReply?.(discussionId, null, text);
    setReplyDrafts((current) => ({ ...current, [discussionId]: "" }));
  };

  return (
    <div className="pazza-answer-box bg-white mt-2">
      <div className="fw-semibold mb-2">followup discussions</div>

      <Form.Control
        as="textarea"
        rows={1}
        className="pazza-textarea-smallest"
        placeholder="Start a new followup discussion"
        value={newDiscussionText}
        onChange={(event) => setNewDiscussionText(event.target.value)}
      />
      <div className="d-flex justify-content-end mt-2 mb-3">
        <Button size="sm" onClick={handleAddDiscussion}>Post</Button>
      </div>

      {discussions.map((discussion) => (
        <div key={discussion.id} className="border rounded p-2 mt-2">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <Button
                size="sm"
                variant={discussion.resolved ? "primary" : "outline-secondary"}
                onClick={() => onToggleResolved?.(discussion.id, true)}
              >
                Resolved
              </Button>
              <Button
                size="sm"
                variant={!discussion.resolved ? "primary" : "outline-secondary"}
                onClick={() => onToggleResolved?.(discussion.id, false)}
              >
                Unresolved
              </Button>
            </div>
            <Dropdown>
              <Dropdown.Toggle size="sm" variant="outline-secondary">
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="small text-muted mt-2">
            {discussion.author} {formatTimestamp(discussion.createdAt)}
          </div>
          <div className="mt-1" style={{ whiteSpace: "pre-wrap" }}>{discussion.body}</div>

          {discussion.replies.map((reply) => (
            <DiscussionReply
              key={reply.id}
              discussionId={discussion.id}
              reply={reply}
              level={1}
              onAddReply={onAddReply}
            />
          ))}

          <Form.Control
            as="textarea"
            rows={1}
            className="mt-2 pazza-textarea-smallest"
            placeholder="Reply to this discussion"
            value={replyDrafts[discussion.id] ?? ""}
            onChange={(event) =>
              setReplyDrafts((current) => ({
                ...current,
                [discussion.id]: event.target.value,
              }))
            }
          />

          <div className="d-flex justify-content-end mt-2">
            <Button size="sm" onClick={() => handleAddDiscussionReply(discussion.id)}>Reply</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
