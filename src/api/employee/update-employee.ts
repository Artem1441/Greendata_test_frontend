// update-employee.ts

import axios from "axios";
import api_url, { update_employee } from "@/constants/apiRoutes";
import { apiUpdateEmployeeErrorMessage } from "@/constants/messages";
import {
  IApiUpdateEmployeeRequest,
  IApiUpdateEmployeeResponse,
} from "@/types/api/employee/update-employee.types";

// PUT
const updateEmployeeApi = async ({
  id,
  fullName,
  position,
  birthDate,
  gender,
  isFired,
}: IApiUpdateEmployeeRequest): Promise<IApiUpdateEmployeeResponse> => {
  try {
    const response = await axios.put(`${api_url}/${update_employee}/${id}`, {
      fullName,
      position,
      birthDate,
      gender,
      isFired,
    });
    return response.data;
  } catch (error) {
    throw new Error(apiUpdateEmployeeErrorMessage);
  }
};

export default updateEmployeeApi;
