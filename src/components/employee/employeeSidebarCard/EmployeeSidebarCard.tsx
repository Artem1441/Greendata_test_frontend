// EmployeeSidebarCard.tsx

import React, { FC, memo, useCallback } from "react";
import { employeeSlice } from "@/store/reducers/employee/EmployeeSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import getEmployeeApi from "@/api/employee/get-employee";
import styles from "./EmployeeSidebarCard.module.scss";
import IEmployeeSidebarCardProps from "./EmployeeSidebarCard.types";

const EmployeeSidebarCard: FC<IEmployeeSidebarCardProps> = memo(
  ({ employee }): JSX.Element => {
    const dispatch = useDispatch();
    const { setActiveIdAction, setEmployeeAction } = employeeSlice.actions;
    const { activeId } = useAppSelector((state) => state.employeeReducer);

    const onSelect = useCallback(async () => {
      await getEmployee();
      dispatch(setActiveIdAction(employee.id));
    }, [employee.id, dispatch, setActiveIdAction]);

    const getEmployee = useCallback(async () => {
      try {
        const result = await getEmployeeApi({ id: employee.id });
        dispatch(setEmployeeAction(result));
      } catch (error) {
        console.error("Ошибка при получении данных сотрудника:", error);
      }
    }, [employee.id, dispatch, setEmployeeAction]);

    return (
      <li
        className={`${styles.employeeSidebarCard} ${
          activeId === employee.id ? styles.employeeSidebarCard_active : ""
        }`}
        onClick={onSelect}
      >
        <p className={`${styles.employeeSidebarCard_text}`}>
          {employee.fullName}
        </p>
        <p className={`${styles.employeeSidebarCard_text}`}>
          Дата рождения: {employee.birthDate}
        </p>
        <p className={`${styles.employeeSidebarCard_text}`}>
          Должность: {employee.position}
        </p>
        <p className={`${styles.employeeSidebarCard_text}`}>
          Уволен: {employee.isFired ? "Да" : "Нет"}
        </p>
      </li>
    );
  }
);

export default EmployeeSidebarCard;
