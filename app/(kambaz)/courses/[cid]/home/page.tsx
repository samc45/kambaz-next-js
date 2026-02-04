import Modules from "../modules/page";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-3">
        <Modules />
      </div>
      <div className="d-none d-lg-block" style={{ marginLeft: "1rem" }}>
        <CourseStatus />
      </div>
    </div>
  );
}
