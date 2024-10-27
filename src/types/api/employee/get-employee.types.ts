// get-employee.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiGetEmployeeRequest {
  id: string;
}

export interface IApiGetEmployeeResponse extends IEmployee {}
