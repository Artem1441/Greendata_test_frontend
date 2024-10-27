// add-employee.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiAddEmployeeRequest {
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
}

export interface IApiAddEmployeeResponse extends IEmployee {}
