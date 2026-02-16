"use client";

import "./answer.css";
import { Button } from "react-bootstrap";
import RichTextEditor from "../RichTextEditor";

type InstructorAnswerProps = {
  answerText: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function InstructorAnswer({
  answerText,
  onChange,
  onSubmit,
  onCancel,
}: InstructorAnswerProps) {
  return (
    <div className="pazza-answer-box">
      <div className="pazza-answer-header mt-2 mb-2">
        <div className="pazza-answer-icon">i</div>
        <div className="pazza-answer-title">
          the instructors&apos; answer{" "}
          <span className="pazza-answer-subtitle">
            where instructors collectively construct a single answer
          </span>
        </div>
      </div>

      <RichTextEditor value={answerText} onChange={onChange} />

      <div className="d-flex gap-2 mt-2">
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}