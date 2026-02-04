"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();

  function currentlyActiveOption(path: string) {
    return pathname.includes(path) ? "active fw-bold" : "text-danger";
  }

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link href="/courses/1234/home" id="wd-course-home-link"
        className={`list-group-item ${currentlyActiveOption("home")} border-0`}> Home
      </Link>
      <br />
      <Link href="/courses/1234/modules" id="wd-course-modules-link"
        className={`list-group-item ${currentlyActiveOption("modules")} border-0`}> Modules
      </Link>
      <br />
      <Link href="/courses/1234/pazza" id="wd-course-pazza-link"
        className={`list-group-item ${currentlyActiveOption("pazza")} border-0`}> Pazza
      </Link>
      <br />
      <Link href="/courses/1234/zoom" id="wd-course-zoom-link"
        className={`list-group-item ${currentlyActiveOption("zoom")} border-0`}> Zoom
      </Link>
      <br />
      <Link href="/courses/1234/assignments" id="wd-course-assignments-link"
        className={`list-group-item ${currentlyActiveOption("assignments")} border-0`}> Assignments
      </Link>
      <br />
      <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link"
        className={`list-group-item ${currentlyActiveOption("quizzes")} border-0`}> Quizzes
      </Link>
      <br />
      <Link href="/courses/1234/people/table" id="wd-course-people-link"
        className={`list-group-item ${currentlyActiveOption("table")} border-0`} > People
      </Link><br />
    </div>
  );
}
