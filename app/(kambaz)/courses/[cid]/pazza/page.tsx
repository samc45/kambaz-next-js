"use client";

import PazzaHeader from "./components/Header";
import ClassGlance from "./components/ClassGlance";
import ListOfPostsSidebar from "./components/ListOfPostsSidebar";
import NewPostScreen from "./components/NewPostScreen";
import { useParams } from "next/navigation";
import PostScreen from "./components/Post/PostScreen";
import { FollowUpDiscussion, Post } from "./types";
import ManageClassScreen from "./components/Manage/ManageClassScreen";
import FolderFilters from "./components/FolderFilters";
import React, { useEffect } from "react";

import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { closeNewPostForm, initializePazzaState, openNewPostForm, setShowInstructorView } from "./reducer";

const exampleFollowUpDiscussion: FollowUpDiscussion = {
  id: "fud1",
  author: "Some Stu",
  body: "ok this is not working",
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  resolved: true,
  replies: [
    {
      id: "reply1",
      author: "Some Instr",
      body: "hmmm let me look",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      replies: [
        {
          id: "reply1-1",
          author: "Some Stu",
          body: "Thanks",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
          replies: [],
        },
      ],
    },
  ],
}

const examplePost: Post = {
  id: "post1",
  type: "question",
  title: "My assignment is not showing as graded",
  author: "John Doe",
  body: "test test",
  folders: [],
  followUpDiscussions: [exampleFollowUpDiscussion],
  instructorPosted: false,
  instructorEndorses: false,
  instructorAnswered: false,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
}

export default function PazzaPage() {
  // Global app state / params
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const {
    postsList,
    showInstructorView,
    selectedPost,
    showNewPostForm,
  } = useSelector((state: RootState) => state.pazzaReducer);

  useEffect(() => {
    dispatch(
      initializePazzaState({
        showInstructorView: false, // default to student view
        postsList: [examplePost],
        foldersList: ["hw1", "hw2", "project", "exam", "office_hours"],
        selectedPost: null, // no post selected by default  
        showNewPostForm: false, // not showing new post form by default
      })
    );

    // TODO implement data fetching logic here / pull from a hook
  }, [cid, dispatch]);

  const onNewPostClose = () => {
    dispatch(closeNewPostForm());
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light" >
      <PazzaHeader
        userName={`${currentUser?.firstName} ${currentUser?.lastName}`}
        isInstructor={currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN"}
        courseName={`${cid}`}
        togglePageView={(page: string) => dispatch(setShowInstructorView(page === "manage"))}
      />
      {showInstructorView === false ? (
        // the Q&A student view
        <>
          <FolderFilters />
          <div className="d-flex flex-grow-1 overflow-hidden">
            <ListOfPostsSidebar
              posts={postsList}
              selectedPost={selectedPost}
              onNewPostClick={() => dispatch(openNewPostForm())}
            />
            <div className="flex-grow-1 p-2 overflow-auto" style={{ background: "#eaeef4" }}>
              {showNewPostForm ? (
                <NewPostScreen onClose={onNewPostClose} />
              ) : selectedPost === null ? (
                <ClassGlance
                  {...postsList}
                />
              ) : (
                <PostScreen {...selectedPost} />
              )}
            </div>
          </div>
        </>
      ) : (
        // the Manage Class instructor view
        <ManageClassScreen />
      )}
    </div >
  );
}
