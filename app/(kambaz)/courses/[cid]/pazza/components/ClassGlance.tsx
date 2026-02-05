import StatRow from "./StatRow";
import StatusRow from "./StatusRow";

export default function ClassAtAGlance() {
  return (
    <div className="border rounded bg-light">
      <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
        <strong className="me-2">Class at a Glance</strong>
      </div>
      <div className="p-3 bg-white">
        <div className="row">
          <div className="col-md-6">
            <StatusRow type="success" text="no unread posts" />
            <StatusRow type="warning" text="2 unanswered questions" />
          </div>
          <div className="col-md-6">
            <StatRow label="total posts" value="27" />
            <StatRow label="instructors' responses" value="5" />
            <StatRow label="students' responses" value="0" />
          </div>
        </div>
      </div>
    </div>
  );
}
