// delete-employee.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiDeleteEmployeeRequest {
  id: string;
}

export interface IApiDeleteEmployeeResponse extends IEmployee {}
