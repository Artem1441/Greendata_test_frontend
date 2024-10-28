// add-employee.ts

import axios from "axios";
import api_url, { add_employee } from "@/constants/apiRoutes";
import { apiAddEmployeeErrorMessage } from "@/constants/messages";
import {
  IApiAddEmployeeRequest,
  IApiAddEmployeeResponse,
} from "@/types/api/employee/add-employee.types";

/*
POST запрос
Запрос на добавление работника в БД
*/
const addEmployeeApi = async ({
  fullName,
  position,
  birthDate,
  gender,
  isFired,
  colleagues
}: IApiAddEmployeeRequest): Promise<IApiAddEmployeeResponse> => {
  try {
    const response = await axios.post(`${api_url}/${add_employee}`, {
      fullName,
      position,
      birthDate,
      gender,
      isFired,
      colleagues
    });
    return response.data;
  } catch (error) {
    throw new Error(apiAddEmployeeErrorMessage);
  }
};

export default addEmployeeApi;
