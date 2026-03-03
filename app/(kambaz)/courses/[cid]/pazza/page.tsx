"use client";

import PazzaHeader from "./components/Header";
import ClassGlance from "./components/ClassGlance";
import ListOfPostsSidebar from "./components/ListOfPostsSidebar";
import NewPostScreen from "./components/NewPostScreen";
import { useParams } from "next/navigation";
import PostScreen from "./components/Post/PostScreen";
import { Folder, FollowUpDiscussion, Post } from "./types";
import ManageClassScreen from "./components/Manage/ManageClassScreen";
import FolderFilters from "./components/FolderFilters";
import React, { useEffect } from "react";

import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { closeNewPostForm, initializePazzaState, openNewPostForm, setShowInstructorView } from "./reducer";
import { v4 as uuidv4 } from 'uuid';

const exampleFolders: Folder[] = [
  { id: uuidv4(), name: "hw1" },
  { id: uuidv4(), name: "hw2" },
  { id: uuidv4(), name: "exam1" },
];

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
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  folders: [exampleFolders[0]],
  followUpDiscussions: [exampleFollowUpDiscussion],
  instructorPosted: true,
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
    foldersList,
    showInstructorView,
    selectedPost,
    showNewPostForm,
  } = useSelector((state: RootState) => state.pazzaReducer);

  const [selectedFolder, setSelectedFolder] = React.useState<Folder | null>(null);

  useEffect(() => {
    dispatch(
      initializePazzaState({
        showInstructorView: false, // default to student view
        postsList: [examplePost],
        foldersList: exampleFolders,
        selectedPost: null, // no post selected by default  
        showNewPostForm: false, // not showing new post form by default
      })
    );
  }, [cid, dispatch]);

  const handleFilterFolderSelected = (folder: Folder | null) => {
    if (!folder) {
      // show all posts
      setSelectedFolder(null);
      return;
    }
    // filter postsList based on selected folder.id
    setSelectedFolder(folder);
  }

  const filteredPosts = React.useMemo(() => {
    if (!selectedFolder) return postsList;
    return postsList.filter((post) => post.folders.some(folder => folder.id === selectedFolder.id));
  }, [postsList, selectedFolder]);

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
          <FolderFilters
            foldersList={foldersList}
            onFolderSelected={(folder: Folder | null) => handleFilterFolderSelected(folder)}
          />
          <div className="d-flex flex-grow-1 overflow-hidden">
            <ListOfPostsSidebar
              posts={filteredPosts}
              selectedPost={selectedPost}
              onNewPostClick={() => dispatch(openNewPostForm())}
            />
            <div className="flex-grow-1 p-2 overflow-auto" style={{ background: "#eaeef4" }}>
              {showNewPostForm ? (
                <NewPostScreen onCancel={() => dispatch(closeNewPostForm())} />
              ) : selectedPost === null ? (
                <ClassGlance
                  posts={postsList} // always use unfiltered posts here since it's a overview
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
