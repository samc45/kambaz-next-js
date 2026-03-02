"use client";

import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { PiPlusThin } from "react-icons/pi";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { TfiWrite } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams, useRouter } from "next/navigation";
import { deleteAssignment } from "./reducer";

type AssignmentRowProps = {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  points: number;
  isFaculty: boolean;
  onEdit: (assignmentId: string) => void;
  onDelete: (assignmentId: string) => void;
};

function AssignmentRow(props: AssignmentRowProps) {
  return (
    <div
      className="d-flex align-items-center justify-content-between px-3 py-2"
      style={{ cursor: "pointer" }}
      onClick={() => props.onEdit(props._id)}
    >
      <div className="d-flex align-items-center gap-3">
        <BsGripVertical className="me-2 flex-shrink-0" />
        <TfiWrite className="text-success me-2 flex-shrink-0" />
        <div className="d-flex flex-column">
          <span className="fw-semibold">{props.title}</span>
          <div className="d-flex flex-wrap gap-2 small text-muted">
            <span className="text-danger">Multiple Modules</span>
            <span>|</span>
            <span>Not available until {new Date(props.available).toLocaleDateString()}</span>
            <span>|</span>
            <span>Due {new Date(props.due).toLocaleDateString()}</span>
            <span>|</span>
            <span>{props.points} pts</span>
          </div>
        </div>
      </div>
      <AssignmentControlButtons
        isFaculty={props.isFaculty}
        onEdit={() => props.onEdit(props._id)}
        onDelete={() => props.onDelete(props._id)}
      />
    </div>
  );
}

export default function Assignments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);

  const goToAssignmentEditor = (assignmentId: string) => {
    router.push(`/courses/${courseId}/assignments/${assignmentId}`);
  };

  const removeAssignment = (assignmentId: string) => {
    if (!isFaculty) return;
    const shouldDelete = window.confirm("Are you sure you want to remove this assignment?");
    if (!shouldDelete) return;
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex flex-wrap justify-content-between mb-4 align-items-center">
        <div className="d-flex align-items-center">
          <InputGroup className="d-flex flex-grow-1" style={{ width: "100%", maxWidth: "400px" }}>
            <InputGroupText className="bg-transparent border-right-0">
              <BsSearch />
            </InputGroupText>
            <FormControl
              style={{ borderLeft: "0" }}
              className="fw-light"
              placeholder="Search..."
              id="wd-search-assignment"
              type="text"
            />
          </InputGroup>
        </div>
        {isFaculty && (
          <div className="d-flex align-items-center gap-2">
            <Button variant="secondary" size="lg" className="me-1 float-end fw-light" id="wd-add-group-btn">
              <PiPlusThin className="me-2 mb-1" />
              Group
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="d-flex align-items-center me-2 fw-light"
              id="wd-add-assignment-btn"
              onClick={() => goToAssignmentEditor("new")}
            >
              <PiPlusThin className="me-2" />
              Assignment
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentsControlButtons isFaculty={isFaculty} />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem key={assignment._id} className="wd-lesson p-3 ps-1">
                <AssignmentRow
                  {...assignment}
                  isFaculty={isFaculty}
                  onEdit={goToAssignmentEditor}
                  onDelete={removeAssignment}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

    </div>
  );
}
