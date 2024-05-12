import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student } from "../../services/apicalls";

export interface StudentDetailState {
    selectedStudent: Student | null;
}

const initialState: StudentDetailState = {
    selectedStudent: null
};

export const studentDetailSlice = createSlice({
    name: "studentDetail",
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<Student>) => {
            state.selectedStudent = action.payload;
        },
        clearStudent: (state) => {
            state.selectedStudent = null;
        }
    }
});

export const { setStudent, clearStudent } = studentDetailSlice.actions;

export const selectStudent = (state: { studentDetail: StudentDetailState }) => state.studentDetail.selectedStudent;

export default studentDetailSlice.reducer;