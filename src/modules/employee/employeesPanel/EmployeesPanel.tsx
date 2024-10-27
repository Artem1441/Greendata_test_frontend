// EmployeesPanel.tsx

import React, { FC, useEffect } from "react";
import getEmployeesApi from "@/api/employee/get-employees";
import EmployeeHeader from "@/components/employee/employeeHeader/EmployeeHeader";
import EmployeeSidebar from "@/components/employee/employeeSidebar/EmployeeSidebar";
import EmployeeFormField from "@/components/employee/employeeFormField/EmployeeFormField";
import { useDispatch } from "react-redux";
import { employeeSlice } from "@/store/reducers/employee/EmployeeSlice";
import IEmployeesPanelProps from "./EmployeesPanel.types";
import styles from "./EmployeesPanel.module.scss";

const EmployeesPanel: FC<IEmployeesPanelProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { setEmployeesAction } = employeeSlice.actions;

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const employees = await getEmployeesApi({});
    dispatch(setEmployeesAction(employees));
  };

  return (
    <>
      <EmployeeHeader />
      <div className={styles.content}>
        <EmployeeSidebar />
        <EmployeeFormField />
      </div>
    </>
  );
};

export default EmployeesPanel;
