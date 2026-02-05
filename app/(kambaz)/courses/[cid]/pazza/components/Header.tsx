import { FaRegUserCircle } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { MdForum } from "react-icons/md";

export default function PazzaHeader() {

  const folder = (name: string) => (
    <span
      className="d-inline-flex align-items-center text-pazza-gray fs-6 fw-light me-4 text-nowrap"
      style={{ cursor: "pointer" }}
    >
      <FaFolder className="me-1" style={{ color: "#6790b4" }} />
      {name}
    </span>
  );

  return (
    <>
      <div className="bg-pazza-blue text-white">
        <div className="mx-auto d-flex align-items-center justify-content-between px-3 py-2">
          <strong className="fw-bold">
            <MdForum className="me-1" />
            pazza
          </strong>

          <div className="d-flex gap-3 small">
            <span className="header-opt-active" role="button">Q&amp;A</span>
            <span role="button">Manage Class</span>
          </div>

          <span className="fs-6">
            <FaRegUserCircle className="fs-5 mb-1 me-1" />
            John Smith
          </span>
        </div>
      </div>

      <div
        className="d-flex align-items-center"
        style={{ backgroundColor: "#e8e8ea", height: "28px" }}
      >
        <span className="text-pazza-gray px-3 text-nowrap">
          Filter by Folder:
        </span>

        <div
          className="flex-grow-1 overflow-auto"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {[
            "office_hours", "hw1", "hw2", "hw3", "hw4", "hw5",
            "hw6", "hw7", "hw8", "hw9", "hw10", "hw11", "hw12", "hw13",
          ].map(folder)}
        </div>
      </div>

    </>
  );
}
