import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { PiPlusThin } from "react-icons/pi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule, isFaculty }: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  isFaculty: boolean
}) {
  return (
    <div className="float-end">
      {isFaculty && (
        <>
          <MdEdit onClick={() => editModule(moduleId)} className="text-primary me-3" />
          <MdDeleteOutline className="text-danger me-2 mb-1 cursor-pointer" onClick={() => deleteModule(moduleId)} />
        </>
      )}
      <GreenCheckmark />
      <PiPlusThin className="ms-3 me-3 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}