// EmployeeSlice.ts

import IEmployee from "@/types/models/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* 
Если activeId = null - показ пустого окна в компоненте EmployeeFormField
Если activeId = -1 - добавление данных нового работника в компоненте EmployeeFormField
Если activeId число (>0) - обновление данных работника в компоненте EmployeeFormField
Также activeId используется для показа выбранного (активного) работника в компоненте EmployeeSidebarCard 
employees - общее кол-во работников. Его можно хранить без динамики (пагинации), т.к кол-во рабоников не может перевалить за высокое кол-во, из-за которого может лагать интерфейс (вряд ли их будет больше 1000 - число, при котором с интерфейсом всё ещё будет нормально)
Остальные поля - поля элемента БД типа IEmployee
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
  colleagues: IEmployee[];
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
  colleagues: [],
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
      state.colleagues = action.payload.colleagues;
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
    setColleguesAction: (
      state: IEmployeeState,
      action: PayloadAction<{ employee: IEmployee; index: number }>
    ) => {
      const { employee, index } = action.payload;
      if (state.colleagues[index]) {
        state.colleagues[index] = employee;
      } else {
        state.colleagues = [...state.colleagues, employee];
      }
    },
    setRemoveCollegueAction: (
      state: IEmployeeState,
      action: PayloadAction<number>
    ) => {
      state.colleagues.splice(action.payload, 1);
    },
    setResetEmployeeAction: (state: IEmployeeState) => {
      state.id = null;
      state.fullName = "";
      state.position = "";
      state.birthDate = "";
      state.gender = "male";
      state.isFired = false;
      state.colleagues = [];
    },
  },
});

export default employeeSlice.reducer;
