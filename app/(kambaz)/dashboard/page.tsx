import Link from "next/link";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import { TfiWrite } from "react-icons/tfi";
import * as db from "../database";

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

function CourseCard({ course }: { course: Course }) {
  return (
    <Col className="wd-dashboard-course">
      <Card>
        <Link href={`/courses/${course._id}/home`}
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
          </CardBody>
        </Link>
      </Card>
    </Col>
  );
}

export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="fw-light">Dashboard</h1>
      <hr />
      <div className="p-4">
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
        <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={3} lg={4} className="g-4">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
