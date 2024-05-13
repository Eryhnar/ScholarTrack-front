import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../services/apicalls";

export interface GroupDetailState {
    selectedGroup: Group;
    groups: Group[];
};

const initialState: GroupDetailState = {
    selectedGroup: {
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
    },
    groups: []
};

export const groupDetailSlice = createSlice({
    name: "groupDetail",
    initialState: initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<Group>) => {
            state.selectedGroup = action.payload;
        },
        setGroups: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        },
        clearGroup: (state) => {
            state.selectedGroup = initialState.selectedGroup;
        },
        clearGroups: (state) => {
            state.groups = initialState.groups;
        }
    }
});

export const { setGroup, setGroups, clearGroup, clearGroups } = groupDetailSlice.actions;

export const selectGroup = (state: { groupDetail: GroupDetailState }) => state.groupDetail.selectedGroup;
export const selectGroups = (state: { groupDetail: GroupDetailState }) => state.groupDetail.groups;

export default groupDetailSlice.reducer;