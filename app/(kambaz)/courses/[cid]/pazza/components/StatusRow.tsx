import { FaCheck, FaExclamation } from "react-icons/fa6";

type StatusType = "success" | "warning";

export default function StatusRow({ text, type }: { text: string; type: StatusType }) {
  return (
    <div className="d-flex align-items-center mb-2">
      <div
        className="me-2 d-flex align-items-center justify-content-center text-white"
        style={{
          width: "22px",
          height: "22px",
          backgroundColor: type === "success" ? "#7ac143" : "#f0ad4e",
          borderRadius: "4px",
        }}
      >
        {
          type === "success" ? <FaCheck /> : <FaExclamation />
        }
      </div>
      <span className="fw-semibold">{text}</span>
    </div>
  );
}
