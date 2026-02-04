import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { PiPlusThin } from "react-icons/pi";
export default function ModulesControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <PiPlusThin className="ms-3 me-3 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}