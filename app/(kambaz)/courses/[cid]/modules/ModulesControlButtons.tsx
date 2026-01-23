import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BiPlus } from "react-icons/bi";
export default function ModulesControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BiPlus className="ms-3 me-3 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}