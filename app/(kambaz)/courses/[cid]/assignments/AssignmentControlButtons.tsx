import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="ml-4 fs-4" />
    </div>
  );
}