"use client"
import { useState } from "react";

import Link from "next/link";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import { TfiWrite } from "react-icons/tfi";
import { Button, FormControl } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import { enroll, unenroll, unenrollAllFromCourse } from "../courses/enrollmentsReducer";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image: string;
}

export default function Dashboard() {
  const courses = useSelector((state: RootState) => state.coursesReducer.courses);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const currentUserId = (currentUser as { _id?: string; role?: string } | null)?._id;
  const isFaculty = (currentUser as { role?: string } | null)?.role === "FACULTY";
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/nextjs.png",
    description: "New Description",
    department: "",
    credits: 0
  });

  const isEnrolled = (courseId: string) => {
    if (!currentUserId) return false;
    return enrollments.some(
      (enrollment) => enrollment.user === currentUserId && enrollment.course === courseId
    );
  };

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id));

  function CourseCard({ course }: { course: Course }) {
    const enrolled = isEnrolled(course._id);

    return (
      <Col className="wd-dashboard-course">
        <Card>
          <Link href={`/courses/${course._id}/home`}
            onClick={(event) => {
              if (!enrolled) {
                event.preventDefault();
              }
            }}
            className="wd-dashboard-course-link text-decoration-none text-dark position-relative">
            <div className="overflow-hidden" style={{
              position: "relative",
              width: "100%",
              height: 160,
            }}>
              <CardImg
                variant="top"
                src={course.image}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden fw-bold">{course.name}</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden h-fit fw-light">
                {course.description.substring(0, 70)}...
              </CardText>
              <TfiWrite />
              {enrolled ? (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (!currentUserId) return;
                    dispatch(unenroll({ userId: currentUserId, courseId: course._id }));
                  }}
                  className="btn btn-danger float-end"
                  id="wd-unenroll-course-click"
                >
                  Unenroll
                </button>
              ) : (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (!currentUserId) return;
                    dispatch(enroll({ userId: currentUserId, courseId: course._id }));
                  }}
                  className="btn btn-success float-end"
                  id="wd-enroll-course-click"
                >
                  Enroll
                </button>
              )}
              {isFaculty && (
                <>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                      dispatch(unenrollAllFromCourse(course._id));
                    }}
                    className="btn btn-danger float-end me-2"
                    id="wd-delete-course-click">
                    Delete
                  </button>
                  <button id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end" >
                    Edit
                  </button>
                </>
              )}
            </CardBody>
          </Link>
        </Card>
      </Col>
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="fw-light">Dashboard</h1>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">New Course</h5>
        <Button
          className="btn btn-primary"
          id="wd-toggle-enrollments-click"
          onClick={() => setShowAllCourses((current) => !current)}
        >
          Enrollments
        </Button>
      </div>
      {isFaculty && (
        <>
          <div>
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))} > Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
              Update
            </button>
          </div>
          <br />
          <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        </>
      )}
      <hr />
      <div className="p-4">
        <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
        <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={3} lg={4} className="g-4">
            {visibleCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
