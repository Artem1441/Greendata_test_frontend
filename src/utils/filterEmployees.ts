// filterEmployees.ts

import IEmployee from "@/types/models/IEmployee";
import IFilterEmployees from "@/types/utils/IFilterEmployees.types";

/* 
Ф-я фильтрации работников, чтобы при выборе коллег (поле "Коллеги") не было повторения своего id и id уже выбранных коллег.
Отдаёт массив IEmployee ещё неколлег
*/
const filterEmployees = ({
  employees,
  id,
  colleagues,
}: IFilterEmployees): IEmployee[] => {
  const ids = [id];
  colleagues.map((colleague) => ids.push(colleague.id));
  console.log(colleagues, ids);
  return employees.filter((employee) => !ids.includes(employee.id));
};

export default filterEmployees;
