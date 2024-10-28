// delete-employee.ts

import axios from "axios";
import api_url, { delete_employee } from "@/constants/apiRoutes";
import { apiDeleteEmployeeErrorMessage } from "@/constants/messages";
import { IApiDeleteEmployeeRequest, IApiDeleteEmployeeResponse } from "@/types/api/employee/delete-employee.types";

/*
DELETE запрос
Запрос на удаление работника из БД по id
*/
const deleteEmployeeApi = async ({
  id,
}: IApiDeleteEmployeeRequest): Promise<IApiDeleteEmployeeResponse> => {
  try {
    const response = await axios.delete(`${api_url}/${delete_employee}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(apiDeleteEmployeeErrorMessage);
  }
};

export default deleteEmployeeApi;
