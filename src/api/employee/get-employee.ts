// get-employee.ts

import axios from "axios";
import api_url, { get_employee } from "@/constants/apiRoutes";
import { apiGetEmployeeErrorMessage } from "@/constants/messages";
import {
  IApiGetEmployeeRequest,
  IApiGetEmployeeResponse,
} from "@/types/api/employee/get-employee.types";

/*
GET запрос
Запрос на получение работника из БД по id
*/
const getEmployeeApi = async ({
  id,
}: IApiGetEmployeeRequest): Promise<IApiGetEmployeeResponse> => {
  try {
    const response = await axios.get(`${api_url}/${get_employee}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(apiGetEmployeeErrorMessage);
  }
};

export default getEmployeeApi;
