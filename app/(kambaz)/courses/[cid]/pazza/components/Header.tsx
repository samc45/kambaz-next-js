import { FaRegUserCircle } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import FolderFilters from "./FolderFilters";
import React from "react";

interface PazzaHeaderProps {
  userName: string;
  isInstructor: boolean;
  courseName: string;
  togglePageView: (page: string) => void;
}

export default function PazzaHeader({ userName, isInstructor, courseName, togglePageView }: PazzaHeaderProps) {
  const [page, setPage] = React.useState('qa');

  const onPageChange = (pageName: string) => {
    setPage(pageName);
    togglePageView(pageName);
  }

  return (
    <>
      <div className="bg-pazza-blue text-white">
        <div className="mx-auto d-flex align-items-center justify-content-between px-3 py-2">
          <strong className="fw-bold">
            <MdForum className="me-1" />
            pazza
          </strong>

          <strong className="small">
            {courseName}
          </strong>

          <div className="d-flex gap-3 small">
            <span
              className={page === "qa" ? "header-opt-active" : ""}
              role="button"
              onClick={() => onPageChange('qa')}>
              Q&amp;A
            </span>
            {isInstructor &&
              <span
                className={page === "manage" ? "header-opt-active" : ""}
                role="button" onClick={() =>
                  onPageChange('manage')}>
                Manage Class
              </span>
            }
          </div>

          <span className="fs-6">
            <FaRegUserCircle className="fs-5 mb-1 me-1" />
            {userName}
          </span>
        </div>
      </div>
    </>
  );
}
