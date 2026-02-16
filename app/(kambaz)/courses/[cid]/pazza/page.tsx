"use client";

import PazzaHeader from "./components/Header";
import ClassGlance from "./components/ClassGlance";
import ListOfPostsSidebar from "./components/ListOfPostsSidebar";
import NewPostScreen from "./components/NewPostScreen";
import { useParams } from "next/navigation";
import PostScreen from "./components/Post/PostScreen";

export default function PazzaPage() {

  const { cid } = useParams();

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <PazzaHeader
        userName="John Smith"
        isInstructor={true}
        courseName={`CID: ${cid}`}
      />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <ListOfPostsSidebar />

        <div className="flex-grow-1 overflow-auto" style={{ background: "#eaeef4" }}>
          {/* <ClassGlance /> */}
          {/* <NewPostScreen /> */}
          <PostScreen />
        </div>
      </div>
    </div>
  );
}
