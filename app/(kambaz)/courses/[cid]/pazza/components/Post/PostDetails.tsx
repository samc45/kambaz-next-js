"use client";

import "./post.css";
import { Badge, Dropdown } from "react-bootstrap";
import { BiQuestionMark } from "react-icons/bi";
import { FaAt } from "react-icons/fa6";
import FolderPill from "../FolderPill";
import { PostType } from "../../types";
import { CgNotes } from "react-icons/cg";

type PostProps = {
  type: PostType;
  title: string;
  author: string;
  body: string;
  folders?: string[];
  views?: number;
};

export default function Post({ type, title, author, body, folders = [], views = 0 }: PostProps) {

  const renderPostTypeIcon = () => {
    if (type === "question") {
      return <BiQuestionMark className="pazza-answer-icon bg-danger text-white" />;
    } else {
      return <CgNotes className="pazza-answer-icon" />;
    }
  };

  return (
    <div className="pazza-post">
      <div className="d-flex align-items-start justify-content-between border-bottom pb-2 mb-3">
        <div className="d-flex align-items-center gap-2">
          {renderPostTypeIcon()}
          <div className="small text-muted">{type} <FaAt /> 57</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="" style={{ background: "#535353" }}>{views} view{views !== 1 ? 's' : ''}</Badge>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column mb-2">
          <h3 style={{ wordBreak: "break-word" }}>{title}</h3>
          <span className="text-muted" style={{ fontSize: "12px" }}>
            Created by {author}
          </span>
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

      <div className="text-muted">
        <div className="mt-2">{body}</div>
      </div>

      <div className="d-flex align-items-center gap-2 mt-3">
        {folders.map((f) => <FolderPill key={f} name={f} selected={false} onClick={() => { }} />)}
      </div>
    </div>
  );
}