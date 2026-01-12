import Link from "next/link";
import Image from "next/image";


// Temporary representation of a course, to easily show 7
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div
        id="wd-dashboard-courses"
        style={{
          display: "grid",
          /**
           * TODO: Use grid system via Tailwind for simpler implementation
           * 
           * This will, temporarily, use inline style to quickly prototype
           * the dashboard layout. ideally this should be done using flexbox
           * and tailwind for a simpler and more maintainable approach.
           * ref: https://www.w3schools.com/cssref/pr_grid-template-columns.php
           */
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          alignItems: "center",
        }}>
        {courses.map((course) => (
          <div key={course.id} className="wd-dashboard-course">
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="wd-dashboard-course-link"
            >
              <Image src={course.imageUrl} width={300} height={180} alt={course.title} />
              <div>
                <h5>{course.title}</h5>
                <p className="wd-dashboard-course-title">{course.description}</p>
                <button>Go</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
