import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { RxHamburgerMenu } from "react-icons/rx";
export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <RxHamburgerMenu className="me-4 fs-3 mb-1" />
        <span className="font-bold fs-4">Course {cid}</span>
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
