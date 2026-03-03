import { FaFolder } from "react-icons/fa6";
import { Folder } from "../types";
import React from "react";

export default function FolderFilters({ foldersList, onFolderSelected }: { foldersList: Folder[], onFolderSelected: (folder: Folder | null) => void }) {

  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null);

  const handleFolderClick = (folder: Folder) => {
    // if folder already selected, deselect it by calling onFolderSelected with null
    if (selectedFolderId === folder.id) {
      setSelectedFolderId(null);
      onFolderSelected(null);
    } else {
      // else select the folder, add class
      setSelectedFolderId(folder.id);
      onFolderSelected(folder);
    }
  }

  const folderOption = (folder: Folder) => (
    <span
      key={folder.id}
      className={`d-inline-flex align-items-center text-pazza-gray fs-6 fw-light me-4 text-nowrap ${selectedFolderId === folder.id ? "fw-bold" : ""}`}
      style={{ cursor: "pointer" }}
      onClick={() => handleFolderClick(folder)}
    >
      <FaFolder className="me-1" style={{ color: "#6790b4" }} />
      {folder.name}
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