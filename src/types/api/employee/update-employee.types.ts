// update-employee.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiUpdateEmployeeRequest {
  id: string;
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
}

export interface IApiUpdateEmployeeResponse extends IEmployee {}
