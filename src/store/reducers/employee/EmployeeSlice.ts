// EmployeeSlice.ts

import IEmployee from "@/types/models/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* 
activeId = -1 - добавление нового работника
 */

interface IEmployeeState {
  activeId: string | null;
  employees: IEmployee[];
  id: string | null;
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
  // colleagues?: string[];
}

const initialState: IEmployeeState = {
  activeId: null,
  employees: [],
  id: null,
  fullName: "",
  position: "",
  birthDate: "",
  gender: "male",
  isFired: false,
  // colleagues: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setActiveIdAction: (
      state: IEmployeeState,
      action: PayloadAction<string | null>
    ) => {
      state.activeId = action.payload;
    },
    setEmployeesAction: (
      state: IEmployeeState,
      action: PayloadAction<IEmployee[]>
    ) => {
      state.employees = action.payload;
    },
    setEmployeeAction: (
      state: IEmployeeState,
      action: PayloadAction<IEmployee>
    ) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.position = action.payload.position;
      state.birthDate = action.payload.birthDate;
      state.gender = action.payload.gender;
      state.isFired = action.payload.isFired;
    },
    setFullNameAction: (
      state: IEmployeeState,
      action: PayloadAction<string>
    ) => {
      state.fullName = action.payload;
    },
    setPositionAction: (
      state: IEmployeeState,
      action: PayloadAction<string>
    ) => {
      state.position = action.payload;
    },
    setBirthDateAction: (
      state: IEmployeeState,
      action: PayloadAction<string>
    ) => {
      state.birthDate = action.payload;
    },
    setGenderAction: (
      state: IEmployeeState,
      action: PayloadAction<"male" | "female">
    ) => {
      state.gender = action.payload;
    },
    setIsFiredAction: (
      state: IEmployeeState,
      action: PayloadAction<boolean>
    ) => {
      state.isFired = action.payload;
    },
    setResetEmployeeAction: (state: IEmployeeState) => {
      state.id = null;
      state.fullName = "";
      state.position = "";
      state.birthDate = "";
      state.gender = "male";
      state.isFired = false;
    },
  },
});

export default employeeSlice.reducer;
