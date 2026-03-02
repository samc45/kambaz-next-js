import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "./types";

type PazzaState = {
  postsList: Post[];
  foldersList: string[];
  showInstructorView: boolean;
  selectedPost: Post | null;
  showNewPostForm: boolean;
};

const initialState: PazzaState = {
  postsList: [],
  foldersList: [],
  showInstructorView: false,
  selectedPost: null,
  showNewPostForm: false,
};

const pazzaSlice = createSlice({
  name: "pazza",
  initialState,
  reducers: {
    initializePazzaState: (state, { payload }: PayloadAction<Partial<PazzaState>>) => {
      return {
        ...state,
        ...payload,
      };
    },
    setPostsList: (state, { payload }: PayloadAction<Post[]>) => {
      state.postsList = payload;
    },
    addPost: (state, { payload }: PayloadAction<Post>) => {
      state.postsList.unshift(payload);
    },
    updatePost: (state, { payload }: PayloadAction<Post>) => {
      state.postsList = state.postsList.map((post) =>
        post.id === payload.id ? payload : post
      );

      if (state.selectedPost?.id === payload.id) {
        state.selectedPost = payload;
      }
    },
    deletePost: (state, { payload: postId }: PayloadAction<string>) => {
      state.postsList = state.postsList.filter((post) => post.id !== postId);
      if (state.selectedPost?.id === postId) {
        state.selectedPost = null;
      }
    },
    setFoldersList: (state, { payload }: PayloadAction<string[]>) => {
      state.foldersList = payload;
    },
    addFolder: (state, { payload }: PayloadAction<string>) => {
      if (!state.foldersList.includes(payload)) {
        state.foldersList.push(payload);
      }
    },
    deleteFolder: (state, { payload }: PayloadAction<string>) => {
      state.foldersList = state.foldersList.filter((folder) => folder !== payload);
    },
    setShowInstructorView: (state, { payload }: PayloadAction<boolean>) => {
      state.showInstructorView = payload;
    },
    setSelectedPost: (state, { payload }: PayloadAction<Post | null>) => {
      state.selectedPost = payload;
    },
    setShowNewPostForm: (state, { payload }: PayloadAction<boolean>) => {
      state.showNewPostForm = payload;
    },
    openNewPostForm: (state) => {
      state.selectedPost = null;
      state.showNewPostForm = true;
    },
    closeNewPostForm: (state) => {
      state.showNewPostForm = false;
    },
    openPostDetails: (state, { payload }: PayloadAction<Post>) => {
      state.selectedPost = payload;
      state.showNewPostForm = false;
    },
  },
});

export const {
  initializePazzaState,
  setPostsList,
  addPost,
  updatePost,
  deletePost,
  setFoldersList,
  addFolder,
  deleteFolder,
  setShowInstructorView,
  setSelectedPost,
  setShowNewPostForm,
  openNewPostForm,
  closeNewPostForm,
  openPostDetails,
} = pazzaSlice.actions;

export default pazzaSlice.reducer;