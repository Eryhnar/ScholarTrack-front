import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../services/apicalls"

export interface GroupTasksState {
    selectedTasks: Task[],
    task: Task
}

const initialState: GroupTasksState = {
    selectedTasks: [],
    task: {
        _id: "",
        name: "",
        description: "",
        deadline: "",
        groups: [],
        weight: "",
        optional: false,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
}

export const groupTasksSlice = createSlice({
    name: "groupTasks",
    initialState: initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.selectedTasks = action.payload;
        },
        clearTasks: (state) => {
            state.selectedTasks = initialState.selectedTasks;
        },

    }
});

export const { setTasks, clearTasks } = groupTasksSlice.actions;

export const selectTasks = (state: { groupTasks: GroupTasksState }) => state.groupTasks.selectedTasks;

export default groupTasksSlice.reducer;