"use client";

import { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import RichTextEditor from "./RichTextEditor";
import FolderPill from "./FolderPill";

type FieldErrorProps = { message?: string };

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <div className="text-danger fst-italic small mt-1">
      {message}
    </div>
  );
}

export default function NewPostScreen({ onCancel }: { onCancel?: () => void }) {
  const [postType, setPostType] = useState<"question" | "note">("question");
  const [postTo, setPostTo] = useState<"entire-class" | "individual">("entire-class");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");

  const folders = [
    "hw1", "hw2", "hw3", "hw4", "hw5", "hw6",
    "project", "exam", "logistics", "other", "office_hours"
  ];

  const toggleFolder = (folder: string) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter(f => f !== folder));
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting post:", {
      postType,
      postTo,
      selectedFolders,
      summary,
      details,
    });
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="p-3 text-pazza-gray" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Post Type</Form.Label>
        <div className="d-flex gap-3">
          <div className={postType === "question" ? "new-post-radio-selected" : ""}>
            <Form.Check
              type="radio"
              id="type-question"
              label={
                <div>
                  <div className="fw-semibold">Question</div>
                  <div className="text-muted small">if you need an answer</div>
                </div>
              }
              checked={postType === "question"}
              onChange={() => setPostType("question")}
            />
          </div>
          <div className={postType === "note" ? "new-post-radio-selected" : ""}>
            <Form.Check
              type="radio"
              id="type-note"
              label={
                <div>
                  <div className="fw-semibold">Note</div>
                  <div className="text-muted small">if you don&apos;t need an answer</div>
                </div>
              }
              checked={postType === "note"}
              onChange={() => setPostType("note")}
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Post To</Form.Label>
        <div className="d-flex gap-3">
          <Form.Check
            type="radio"
            id="post-entire-class"
            label="Entire Class"
            checked={postTo === "entire-class"}
            onChange={() => setPostTo("entire-class")}
          />
          <Form.Check
            type="radio"
            id="post-individual"
            label="Individual Student(s) / Instructor(s)"
            checked={postTo === "individual"}
            onChange={() => setPostTo("individual")}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Select Folder(s)</Form.Label>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {folders.map((folder) =>
            <FolderPill
              key={folder}
              name={folder}
              selected={selectedFolders.includes(folder)}
              onClick={toggleFolder}
            />
          )}
        </div>
        <FieldError message="Please select at least one folder." />
        <a href="#" className="text-primary fw-medium small">
          Manage and reorder folders
        </a>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Summary*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a TLDR like summary, 100 characters or less"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          maxLength={100}
        />
        <FieldError message="Please enter a summary. Max 100 characters." />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold d-flex justify-content-between align-items-center">
          <span>Details</span>
        </Form.Label>
        <RichTextEditor
          value={details}
          onChange={(value: string) => setDetails(value)}
        />
        <FieldError message="Please enter the details of your post. Max 500 characters." />

      </Form.Group>

      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          Post My Question to [COURSE NAME]
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
