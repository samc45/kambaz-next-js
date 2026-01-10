"use client";

import { useState } from "react";

export default function AssignmentEditor() {

  const [description, setDescription] = useState('The assignment is available online Submit a link to the landing page of the assignment.');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Name</h2>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        onChange={handleDescriptionChange}
        rows={10}
        cols={50}
        value={description}
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as </label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Letter">Letter</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
              <br />
              <br />
              Online Entry Options
              <ul style={{ listStyleType: "none", paddingLeft: 0, marginTop: "0.5em" }}>
                <li>
                  <input type="checkbox" id="wd-text-entry" defaultChecked />
                  <label htmlFor="wd-text-entry">Text Entry</label>
                </li>
                <li>
                  <input type="checkbox" id="wd-website-url" defaultChecked />
                  <label htmlFor="wd-website-url">Website URL</label>
                </li>
                <li>
                  <input type="checkbox" id="wd-media-recordings" defaultChecked />
                  <label htmlFor="wd-media-recordings">Media Recordings</label>
                </li>
                <li>
                  <input type="checkbox" id="wd-student-annotation" defaultChecked />
                  <label htmlFor="wd-student-annotation">Student Annotation</label>
                </li>
                <li>
                  <input type="checkbox" id="wd-file-upload" defaultChecked />
                  <label htmlFor="wd-file-upload">File Upload</label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
              <br />
              <input id="wd-assign-to" type="text" defaultValue={"Everyone"} />
              <br />
              <br />
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input id="wd-due-date" type="date" />
              <br />
              <br />
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <label htmlFor="wd-available-from">Available from</label>
                  <br />
                  <input id="wd-available-from" type="date" />
                </div>
                <div>
                  <label htmlFor="wd-available-until">Available until</label>
                  <br />
                  <input id="wd-available-until" type="date" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
