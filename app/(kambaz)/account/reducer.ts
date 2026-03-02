import { createSlice } from "@reduxjs/toolkit";
type CurrentUser = {
  role?: string;
  [key: string]: unknown;
};

const initialState: { currentUser: CurrentUser | null } = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;

export default accountSlice.reducer;