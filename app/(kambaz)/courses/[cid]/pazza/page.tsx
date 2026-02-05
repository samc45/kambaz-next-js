import PazzaHeader from "./components/Header";
import PazzaSidebar from "./components/Sidebar";
import ClassGlance from "./components/ClassGlance";

export default function PazzaPage() {
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <PazzaHeader />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="border-end bg-white" style={{ width: "300px" }}>
          <PazzaSidebar />
        </div>

        <div className="flex-grow-1 overflow-auto p-3" style={{ background: "#eaeef4" }}>
          <ClassGlance />
        </div>
      </div>
    </div>
  );
}
