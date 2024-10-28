// add-employee.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiAddEmployeeRequest {
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
  colleagues: IEmployee[]
}

export interface IApiAddEmployeeResponse extends IEmployee {}
