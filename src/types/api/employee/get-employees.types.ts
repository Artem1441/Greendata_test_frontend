// get-employees.types.ts

import IEmployee from "@/types/models/IEmployee";

export interface IApiGetEmployeesRequest {}

export interface IApiGetEmployeesResponse extends Array<IEmployee> {}