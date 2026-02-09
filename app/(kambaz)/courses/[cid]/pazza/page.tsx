"use client";

import PazzaHeader from "./components/Header";
import ClassGlance from "./components/ClassGlance";
import ListOfPostsSidebar from "./components/ListOfPostsSidebar";
import NewPostScreen from "./components/NewPostScreen";

export default function PazzaPage() {

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <PazzaHeader
        userName="John Smith"
        isInstructor={true}
        courseName="CS4550: Web Dev"
      />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <ListOfPostsSidebar />

        <div className="flex-grow-1 overflow-auto" style={{ background: "#eaeef4" }}>
          {/* <ClassGlance /> */}
          <NewPostScreen />
        </div>
      </div>
    </div>
  );
}
