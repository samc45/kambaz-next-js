"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function CourseLink({ path, name, cid }: { path: string; name: string; cid: string }) {
  const pathname = usePathname();
  const isActive = pathname.includes(path);
  return (
    <Link href={`/courses/${cid}/${path}`} id={`wd-course-${path}-link`}
      className={`list-group-item ${isActive ? "active fw-bold" : "text-danger"} border-0`}>
      {name}
    </Link>
  );
}

export default function CourseNavigation() {
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <CourseLink key={link} path={link.toLowerCase()} name={link} cid={Array.isArray(cid) ? cid[0] : (cid || "")} />
      ))}
    </div>
  );
}
