import { FaRegUserCircle } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import FolderFilters from "./FolderFilters";

interface PazzaHeaderProps {
  userName: string;
  isInstructor: boolean;
  courseName: string;
}

export default function PazzaHeader({ userName, isInstructor, courseName }: PazzaHeaderProps) {

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
            <span className="header-opt-active" role="button">Q&amp;A</span>
            {isInstructor && <span role="button">Manage Class</span>}
          </div>

          <span className="fs-6">
            <FaRegUserCircle className="fs-5 mb-1 me-1" />
            {userName}
          </span>
        </div>
      </div>

      <FolderFilters />
    </>
  );
}
