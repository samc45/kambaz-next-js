import { FaFolder } from "react-icons/fa6";

export default function FolderFilters() {

  // fetch folders from backend
  const foldersList = [
    "office_hours", "hw1", "hw2", "hw3", "hw4", "hw5",
    "hw6", "hw7", "hw8", "hw9", "hw10", "hw11", "hw12", "hw13",
  ];

  const folderOption = (name: string) => (
    <span
      key={name}
      className="d-inline-flex align-items-center text-pazza-gray fs-6 fw-light me-4 text-nowrap"
      style={{ cursor: "pointer" }}
    >
      <FaFolder className="me-1" style={{ color: "#6790b4" }} />
      {name}
    </span>
  );

  return (
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
        {foldersList.map(folderOption)}
      </div>
    </div>
  );
}