// EmployeeHeader.tsx

import deleteEmployeeApi from "@/api/employee/delete-employee";
import getEmployeesApi from "@/api/employee/get-employees";
import { useAppSelector } from "@/hooks/useAppSelector";
import Button from "@/shared/button/Button";
import Modal from "@/shared/modal/Modal";
import Title from "@/shared/title/Title";
import { employeeSlice } from "@/store/reducers/employee/EmployeeSlice";
import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./EmployeeHeader.module.scss";
import IEmployeeHeaderProps from "./EmployeeHeader.types";

const EmployeeHeader: FC<IEmployeeHeaderProps> = ({}): JSX.Element => {
  const dispatch = useDispatch();
  const { setActiveIdAction, setEmployeesAction, setResetEmployeeAction } =
    employeeSlice.actions;
  const { activeId, id } = useAppSelector((state) => state.employeeReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const canDelete = activeId !== null && activeId !== "-1";

  const onAdd = useCallback(() => {
    dispatch(setActiveIdAction("-1"));
    dispatch(setResetEmployeeAction());
  }, [dispatch]);

  const onDelete = useCallback(async () => {
    try {
      await deleteEmployee();
      await getEmployees();
      dispatch(setActiveIdAction(null));
      dispatch(setResetEmployeeAction());
      setIsOpen(false);
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
  }, [id, dispatch]);

  const getEmployees = async () => {
    try {
      const employees = await getEmployeesApi({});
      dispatch(setEmployeesAction(employees));
    } catch (error) {
      console.error("Ошибка при получении сотрудников:", error);
    }
  };

  const deleteEmployee = async () => {
    try {
      await deleteEmployeeApi({ id: id! });
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
  };

  return (
    <>
      <header className={styles.employeeHeader}>
        <Button onClick={onAdd}>Добавить нового сотрудника</Button>

        <Button
          onClick={() => setIsOpen(true)}
          disabled={!canDelete}
        >
          Удалить выбранного сотрудника
        </Button>
      </header>

      {isOpen && (
        <Modal closeAction={() => setIsOpen(false)}>
          <Title>Вы точно уверены?</Title>
          <div className={styles.employeeHeader_flex}>
            <Button onClick={() => setIsOpen(false)}>Отмена</Button>
            <Button onClick={onDelete}>Удалить</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EmployeeHeader;
