import { IoEllipsisVertical } from "react-icons/io5";
import { PiPlusThin } from "react-icons/pi";
import { Badge } from "react-bootstrap";

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <Badge className="bg-transparent me-2 fw-light border-radius-3" style={{ border: "1px solid #273540", color: "#273540" }}>40% of Total</Badge>
      <PiPlusThin className="ms-3 me-3 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}