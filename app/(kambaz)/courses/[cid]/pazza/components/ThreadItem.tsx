import { Badge } from "react-bootstrap";
import { FaInfo, FaSquare } from "react-icons/fa6";
import { PiChalkboardTeacherFill } from "react-icons/pi";

export default function ThreadItem({
  title,
  subtitle,
  time,
  instructorPosted,
  instructorEndorses,
  instructorAnswered,
  pinned,
}: {
  title: string;
  subtitle: string;
  time: string;
  instructorPosted?: boolean;
  instructorEndorses?: boolean;
  instructorAnswered?: boolean;
  pinned?: boolean;
}) {
  return (
    <div className="thread-item d-flex flex-row px-2 py-2 border-bottom justify-content-between w-100"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-row fw-semibold text-truncate">
          {instructorPosted && (
            <Badge bg="light" className="me-1 mt-1 h-75 d-flex small align-items-center w-50 ml-2" title="An instructor posted this question">
              <FaSquare className="text-warning me-1" />
              <span className="font-bold text-pazza-gray">Instr</span>
            </Badge>
          )}
          {title.length > 30 ? (
            <>
              {title.slice(0, 30)}
              {"..."}
            </>
          ) : (
            title
          )}
        </div>
        <div className="text-muted small" style={{ fontSize: "13px" }}>
          {subtitle.length > 40
            ? (
              <>
                {subtitle.slice(0, 40)}
                {subtitle.slice(40, 70)}
                {subtitle.length > 110 && "..."}
              </>
            )
            : (
              <>
                {subtitle}
              </>
            )
          }
        </div>
        {instructorEndorses && (
          <div className="text-success small mt-1 text-nowrap" style={{ fontSize: "12px" }}>
            An instructor thinks this is a good question
          </div>
        )}
        {pinned && (
          <div className="text-danger small mt-1" style={{ fontSize: "12px" }}>
            Pinned
          </div>
        )}
      </div>
      <div className="d-flex flex-column align-items-end w-100">
        <div className="d-flex text-muted small ms-2 w-100 justify-content-end" style={{ fontSize: "12px" }}>
          {time}
        </div>
        {instructorAnswered && (
          <div className="d-flex text-warning small align-items-end" title="An instructor has answered this question">
            <Badge bg="warning" className="d-flex w-75 ms-auto">
              <FaInfo />
            </Badge>
          </div>
        )}
      </div>

    </div>
  );
}