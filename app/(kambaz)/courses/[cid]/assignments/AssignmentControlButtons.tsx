import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-4">
      <div className="mt-1">
        <GreenCheckmark />
      </div>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}