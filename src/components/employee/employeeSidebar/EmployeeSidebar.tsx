// EmployeeSidebar.tsx

import React, { FC } from "react";
import EmployeeSidebarCard from "@/components/employee/employeeSidebarCard/EmployeeSidebarCard";
import { useAppSelector } from "@/hooks/useAppSelector";
import IEmployee from "@/types/models/IEmployee";
import styles from "./EmployeeSidebar.module.scss";
import Title from "@/shared/title/Title";
import IEmployeeSidebarProps from "./EmployeeSidebar.types";

const EmployeeSidebar: FC<IEmployeeSidebarProps> = ({}): JSX.Element => {
  const { employees } = useAppSelector((state) => state.employeeReducer);

  return (
    <aside className={styles.employeeSidebar}>
      <Title>Список сотрудников</Title>
      <ul className={styles.employeeSidebar_list}>
        {employees.map((employee: IEmployee) => (
          <EmployeeSidebarCard employee={employee} key={employee.id} />
        ))}
      </ul>
    </aside>
  );
};

export default EmployeeSidebar;
