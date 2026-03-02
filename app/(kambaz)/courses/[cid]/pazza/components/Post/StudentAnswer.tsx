"use client";

import "./answer.css";
import { Button, Dropdown } from "react-bootstrap";
import RichTextEditor from "../RichTextEditor";
import { Answer } from "../../types";

type StudentAnswerProps = {
  isNewAnswer: boolean;
  answer: Answer;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function StudentAnswer({
  isNewAnswer,
  answer,
  onChange,
  onSubmit,
  onCancel,
}: StudentAnswerProps) {
  return (
    <div className="pazza-answer-box bg-white mt-2">
      <div className="pazza-answer-header mt-2">
        <div className="pazza-answer-icon" style={{ background: "#8cc63f" }}>S</div>
        <div className="pazza-answer-title">
          students&apos; answer{" "}
          <span className="pazza-answer-subtitle">
            where students collectively construct a single answer
          </span>
        </div>
      </div>
      <hr className="mb-2" />

      {isNewAnswer ? (
        <>
          <RichTextEditor value={""} onChange={onChange} />
          <div className="d-flex gap-2 mt-2">
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
            <Button variant="outline-secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column mb-2">
              <span className="text-muted" style={{ fontSize: "12px" }}>
                Created by {answer.author}
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
            <div dangerouslySetInnerHTML={{ __html: answer.body }} />
          </div>
        </>
      )
      }
    </div >
  );
}