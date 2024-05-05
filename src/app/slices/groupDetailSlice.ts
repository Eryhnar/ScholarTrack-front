import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../services/apicalls";

const initialState: Group = {
    _id: "",
    name: "",
    author: "",
    collaborators: [],
    level: "",
    students: [],
    tasks: [],
    status: "active",
    gradingScale: null,
    createdAt: new Date(),
    updatedAt: new Date()
};

export const groupDetailSlice = createSlice({
    name: "groupDetail",
    initialState: initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<Group>) => {
            Object.assign(state, action.payload);
        },
        clearGroup: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const { setGroup, clearGroup } = groupDetailSlice.actions;

export const selectGroup = (state: { groupDetail: Group }) => state.groupDetail;

export default groupDetailSlice.reducer;