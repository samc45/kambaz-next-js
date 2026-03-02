"use client";

import { ReactNode, useEffect } from "react";
import CourseNavigation from "./Navigation";

import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";

import { RxHamburgerMenu } from "react-icons/rx";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const currentUserId = (currentUser as { _id?: string } | null)?._id;
  const course = courses.find((course) => course._id === courseId);

  const enrolled = !!currentUserId && enrollments.some(
    (enrollment) => enrollment.user === currentUserId && enrollment.course === courseId
  );

  useEffect(() => {
    if (!currentUserId) {
      router.replace("/account/signin");
      return;
    }
    if (!enrolled) {
      router.replace("/dashboard");
    }
  }, [currentUserId, enrolled, router]);

  if (!currentUserId || !enrolled) {
    return null;
  }

  const breadcrumb = <Breadcrumb course={course} />;
  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center text-danger">
        <RxHamburgerMenu className="me-4 fs-3 mb-1" />
        <span className="font-bold fs-5">
          {breadcrumb}
        </span>
      </div>
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
