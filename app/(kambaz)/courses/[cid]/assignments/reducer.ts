import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments } from "../../../database";

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
};

const initialState: { assignments: Assignment[] } = {
  assignments: assignments,
};

const slice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }: PayloadAction<Partial<Assignment>>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        course: assignment.course || "",
        title: assignment.title || "New Assignment",
        description: assignment.description || "",
        points: assignment.points ?? 100,
        due: assignment.due || "",
        available: assignment.available || "",
      };
      state.assignments.unshift(newAssignment);
    },
    updateAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = slice.actions;
export default slice.reducer;