// get-employees.ts

import axios from "axios";
import api_url, { get_employees } from "@/constants/apiRoutes";
import { apiGetEmployeesErrorMessage } from "@/constants/messages";
import {
  IApiGetEmployeesRequest,
  IApiGetEmployeesResponse,
} from "@/types/api/employee/get-employees.types";

/*
GET запрос
Запрос на получение всех работников из БД
*/
const getEmployeesApi =
  async ({}: IApiGetEmployeesRequest): Promise<IApiGetEmployeesResponse> => {
    try {
      const response = await axios.get(`${api_url}/${get_employees}`);
      return response.data;
    } catch (error) {
      throw new Error(apiGetEmployeesErrorMessage);
    }
  };

export default getEmployeesApi;
