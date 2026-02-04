import Link from "next/link";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardText from "react-bootstrap/esm/CardText";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import { TfiWrite } from "react-icons/tfi";


// Temporary representation of a course, to easily show 7
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Col className="wd-dashboard-course">
      <Card>
        <Link href={`/courses/${course.id}/home`}
          className="wd-dashboard-course-link text-decoration-none text-dark position-relative">
          <div className="overflow-hidden" style={{
            position: "relative",
            width: "100%",
            height: 160,
          }}>
            <CardImg
              variant="top"
              src={course.imageUrl}
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
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden fw-bold">{course.title}</CardTitle>
            <CardText className="wd-dashboard-course-description overflow-hidden h-fit fw-light">
              {course.description}
            </CardText>
            <TfiWrite />
          </CardBody>
        </Link>
      </Card>
    </Col>
  );
}

export default function Dashboard() {

  const courses: Course[] = [
    {
      id: "1234",
      title: "CS1234 React JS",
      description: "Frontend Development",
      imageUrl: "/images/reactjs.png"
    },
    {
      id: "5678",
      title: "CS5678 Next JS",
      description: "Frontend Development",
      imageUrl: "/images/nextjs.png"
    },
    {
      id: "9101",
      title: "CS9101 Node JS",
      description: "Backend Development",
      imageUrl: "/images/nodejs.png"
    },
    {
      id: "2131",
      title: "CS2131 Tailwind CSS",
      description: "Frontend Development",
      imageUrl: "/images/tailwind.png"
    },
    {
      id: "4151",
      title: "CS4156 Golang Backend",
      description: "Backend Development",
      imageUrl: "/images/golang.png"
    },
    {
      id: "6171",
      title: "CS6171 Serverless Framework",
      description: "Cloud Development",
      imageUrl: "/images/serverless.png"
    },
    {
      id: "8192",
      title: "CS8192 Native Web Apps",
      description: "Full Stack Development",
      imageUrl: "/images/native-apps.png"
    }
  ];

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
              <CourseCard key={course.id} course={course} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
