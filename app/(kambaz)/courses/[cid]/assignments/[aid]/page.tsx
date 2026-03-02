"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Table } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, deleteAssignment, updateAssignment, Assignment } from "../reducer";
import { useParams, useRouter } from "next/navigation";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const cid = (Array.isArray(params.cid) ? params.cid[0] : params.cid) || "";
  const aid = (Array.isArray(params.aid) ? params.aid[0] : params.aid) || "";
  const isNewAssignment = aid === "new";

  const assignment = useMemo(
    () => assignments.find((a) => a._id === aid && a.course === cid),
    [assignments, aid, cid]
  );

  const [editedAssignment, setEditedAssignment] = useState<Assignment>({
    _id: aid,
    course: cid,
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
  });

  useEffect(() => {
    if (!isNewAssignment && assignment) {
      // update state with existing assignment details
      setEditedAssignment(assignment);
      return;
    }

    // if its a new assignment then set default values for available and due dates
    if (isNewAssignment) {
      const today = new Date().toISOString().split("T")[0];
      setEditedAssignment({
        _id: "new",
        course: cid,
        title: "",
        description: "",
        points: 100,
        due: today,
        available: today,
      });
    }
  }, [assignment, cid, isNewAssignment]);

  useEffect(() => {
    // Only allow faculty to access this page since students can just view
    if (!isFaculty) {
      router.replace(`/courses/${cid}/assignments`);
    }
  }, [cid, isFaculty, isNewAssignment, router]);

  const onCancel = () => {
    // Navigate back to assignments list
    router.push(`/courses/${cid}/assignments`);
  };

  const onSave = () => {
    const assignmentToSave: Assignment = {
      ...editedAssignment,
      course: cid,
      points: Number(editedAssignment.points),
    };

    if (isNewAssignment) {
      dispatch(addAssignment(assignmentToSave));
    } else {
      dispatch(updateAssignment(assignmentToSave));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const onDelete = () => {
    if (isNewAssignment || !assignment) return;
    dispatch(deleteAssignment(assignment._id));
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form className="w-50">

        <FormGroup>
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            className="form-control"
            id="wd-name"
            value={editedAssignment.title}
            onChange={(e) => setEditedAssignment({ ...editedAssignment, title: e.target.value })}
          />
        </FormGroup>

        <FormGroup className="mt-4">
          <FormControl
            as="textarea"
            id="wd-description"
            onChange={(e) => setEditedAssignment({ ...editedAssignment, description: e.target.value })}
            rows={10}
            cols={50}
            value={editedAssignment.description}
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
                <FormControl
                  type="number"
                  className="form-control"
                  id="wd-points"
                  value={editedAssignment.points}
                  onChange={(e) =>
                    setEditedAssignment({
                      ...editedAssignment,
                      points: Number(e.target.value),
                    })
                  }
                />
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
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="date"
                          id="wd-due-date"
                          value={editedAssignment.due}
                          onChange={(e) =>
                            setEditedAssignment({ ...editedAssignment, due: e.target.value })
                          }
                        />
                      </InputGroup>
                    </div>
                  </div>
                  <div className="d-flex w-full gap-3 justify-content-between">
                    <div>
                      <label>Available from</label>
                      <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <InputGroup className="mb-3">
                          <Form.Control
                            type="date"
                            id="wd-available-from"
                            value={editedAssignment.available}
                            onChange={(e) =>
                              setEditedAssignment({ ...editedAssignment, available: e.target.value })
                            }
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div>
                      <label>Available until</label>
                      <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <InputGroup className="mb-3">
                          <Form.Control
                            type="date"
                            id="wd-available-until"
                            value={editedAssignment.due}
                            onChange={(e) =>
                              setEditedAssignment({ ...editedAssignment, due: e.target.value })
                            }
                          />
                        </InputGroup>
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
          {!isNewAssignment && (
            <Button
              variant="outline-danger"
              size="lg"
              className="d-flex align-items-center me-2 fw-light"
              type="button"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
          <Button
            variant="secondary"
            size="lg"
            className="d-flex align-items-center me-2 fw-light"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="d-flex align-items-center me-2 fw-light"
            type="button"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </Form>
    </div >
  );
}
