import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

type AssignmentControlButtonsProps = {
  isFaculty: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AssignmentControlButtons({
  isFaculty,
  onEdit,
  onDelete,
}: AssignmentControlButtonsProps) {
  return (
    <div className="float-end d-flex align-items-center gap-4">
      <div className="mt-1">
        <GreenCheckmark />
      </div>
      {isFaculty && (
        <>
          <MdEdit
            className="fs-4 text-primary"
            role="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          />
          <MdDeleteOutline
            className="fs-4 text-danger"
            role="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          />
        </>
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}