"use client";

import { useState } from "react";
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Table } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function AssignmentEditor() {

  const [description, setDescription] = useState('The assignment is available online Submit a link to the landing page of the assignment.');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div id="wd-assignments-editor">
      <Form className="w-50">

        <FormGroup>
          <FormLabel>Assignment Name</FormLabel>
          <FormControl className="form-control" id="wd-name" defaultValue="A1 - ENV + HTML" />
        </FormGroup>

        <FormGroup className="mt-4">
          <FormControl
            as="textarea"
            id="wd-description"
            onChange={handleDescriptionChange}
            rows={10}
            cols={50}
            value={description}
          />
        </FormGroup>
        <br />
        <Table className="assignment-edit-table">
          <tbody>
            <tr style={{ border: "none" }}>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <FormControl type="number" className="form-control" id="wd-points" defaultValue={100} />
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
              </td>
              <td>
                <FormControl as="select" id="wd-group" defaultValue="ASSIGNMENTS">
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </FormControl>
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as </label>
              </td>
              <td>
                <FormControl as="select" id="wd-display-grade-as" defaultValue="Percentage">
                  <option value="Percentage">Percentage</option>
                  <option value="Letter">Letter</option>
                </FormControl>
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
              </td>
              <td>
                <Card className="p-3">
                  <FormControl as="select" id="wd-submission-type" defaultValue="Online">
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                  </FormControl>
                  <ul className="mt-4" style={{ paddingLeft: 0, marginTop: "0.5em" }}>
                    <FormGroup>
                      <FormLabel>Online Entry Options</FormLabel>
                      <div>
                        <Form.Check
                          type="checkbox"
                          id="wd-text-entry"
                          label="Text Entry"
                        />
                        <Form.Check
                          type="checkbox"
                          id="wd-website-url"
                          label="Website URL"
                          defaultChecked
                        />
                        <Form.Check
                          type="checkbox"
                          id="wd-media-recordings"
                          label="Media Recordings"
                        />
                        <Form.Check
                          type="checkbox"
                          id="wd-student-annotation"
                          label="Student Annotation"
                        />
                        <Form.Check
                          type="checkbox"
                          id="wd-file-upload"
                          label="File Upload"
                        />
                      </div>
                    </FormGroup>
                  </ul>
                </Card>
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label>Assign</label>
              </td>
              <td>
                <Card className="p-3">
                  <FormGroup className="mb-2">
                    <FormLabel>Assign To</FormLabel>
                    <FormControl
                      as="select"
                      multiple
                      id="wd-assign-to-multi"
                      defaultValue={["Everyone"]}
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="Section 1">Section 1</option>
                      <option value="Section 2">Section 2</option>
                    </FormControl>
                  </FormGroup>
                  <div className="mb-3">
                    <label>Due</label>
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                      <FaCalendarAlt />
                      <Datetime initialValue={new Date()} />
                    </div>
                  </div>
                  <div className="w-full" style={{ display: "flex", gap: "20px" }}>
                    <div>
                      <label>Available from</label>
                      <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <FaCalendarAlt className="flex-shrink-0" />
                        <Datetime initialValue={new Date()} />
                      </div>
                    </div>
                    <div>
                      <label>Available until</label>
                      <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <FaCalendarAlt className="flex-shrink-0" />
                        <Datetime initialValue={new Date()} />
                      </div>
                    </div>
                  </div>
                </Card>
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <div className="d-flex flex-row gap-2 justify-content-end">
          <Button variant="secondary" size="lg" className="d-flex align-items-center me-2 fw-light">
            Cancel
          </Button>
          <Button variant="danger" size="lg" className="d-flex align-items-center me-2 fw-light">
            Save
          </Button>
        </div>
      </Form>
    </div >
  );
}
