// EmployeeFormField.tsx

import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import addEmployeeApi from "@/api/employee/add-employee";
import getEmployeesApi from "@/api/employee/get-employees";
import updateEmployeeApi from "@/api/employee/update-employee";
import { useAppSelector } from "@/hooks/useAppSelector";
import { employeeSlice } from "@/store/reducers/employee/EmployeeSlice";
import styles from "./EmployeeFormField.module.scss";
import Button from "@/shared/button/Button";
import Title from "@/shared/title/Title";
import IEmployeeFormFieldProps from "./EmployeeFormField.types";

const positions = [
  "Программист",
  "Тестировщик",
  "Системный администратор",
  "Аналитик",
  "Менеджер проектов",
  "Дизайнер",
  "DevOps-инженер",
  "Сетевой администратор",
  "Продуктовый менеджер",
  "Технический писатель",
];

const EmployeeFormField: FC<IEmployeeFormFieldProps> = ({}): JSX.Element => {
  const dispatch = useDispatch();
  const {
    setActiveIdAction,
    setEmployeesAction,
    setFullNameAction,
    setPositionAction,
    setBirthDateAction,
    setGenderAction,
    setIsFiredAction,
    setResetEmployeeAction,
  } = employeeSlice.actions;
  const { activeId, id, fullName, position, birthDate, gender, isFired } =
    useAppSelector((state) => state.employeeReducer);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Если нет активного ID, ничего не делаем
    if (!activeId || activeId === "-1") return;

    const handler = setTimeout(async () => {
      onUpdate();
    }, 500); // 500 мс задержка

    // Очищаем таймер при изменении зависимостей
    return () => clearTimeout(handler);
  }, [fullName, position, birthDate, gender, isFired]);

  const validateForm = (): string | null => {
    if (!fullName) return "*Введите ФИО полностью";
    if (!position) return "*Выберите должность";
    return null;
  };

  const onAdd = useCallback(async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      await addEmployee();
      await getEmployees();
      dispatch(setActiveIdAction(null));
      dispatch(setResetEmployeeAction());
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Ошибка при добавлении сотрудника");
    }
  }, [fullName, position, birthDate, gender, isFired]);

  const onUpdate = useCallback(async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      await updateEmployee();
      await getEmployees();
      setError(null);
    } catch (error) {
      console.error("Ошибка обновления:", error);
      setError("Ошибка при обновлении сотрудника");
    }
  }, [fullName, position, birthDate, gender, isFired]);

  const getEmployees = async () => {
    try {
      const employees = await getEmployeesApi({});
      dispatch(setEmployeesAction(employees));
    } catch (error) {
      console.error(error);
      setError("Не удалось загрузить список сотрудников");
    }
  };

  const addEmployee = async () => {
    try {
      await addEmployeeApi({
        fullName,
        position,
        birthDate,
        gender,
        isFired,
      });
    } catch (error) {
      console.error(error);
      setError("Не удалось добавить сотрудника");
    }
  };

  const updateEmployee = async () => {
    try {
      await updateEmployeeApi({
        id: id!,
        fullName,
        position,
        birthDate,
        gender,
        isFired,
      });
    } catch (error) {
      console.error(error);
      setError("Не удалось обновить сотрудника");
    }
  };

  return (
    <>
      <div className={styles.employeeFormField}>
        {activeId ? (
          <>
            {activeId === "-1" ? (
              <Title>Создание нового сотрудника</Title>
            ) : (
              <Title>Редактирование сотрудника</Title>
            )}

            <div className={styles.employeeFormField_form}>
              <div>
                <label>*ФИО:</label>
                <input
                  placeholder="Иванов Иван Иванович"
                  type="text"
                  value={fullName}
                  onChange={(e) => dispatch(setFullNameAction(e.target.value))}
                />
              </div>

              <div>
                <label>*Должность:</label>
                <select
                  title="Должность"
                  value={position}
                  onChange={(e) => dispatch(setPositionAction(e.target.value))}
                >
                  <option disabled={true} value="">
                    Выберите должность
                  </option>
                  {positions.map((pos: string, index: number) => (
                    <option key={index} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Дата рождения:</label>
                <input
                  placeholder="01.01.2004"
                  type="date"
                  value={birthDate}
                  onChange={(e) => dispatch(setBirthDateAction(e.target.value))}
                />
              </div>

              <label>Пол:</label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) =>
                    dispatch(
                      setGenderAction(
                        e.currentTarget.value as "male" | "female"
                      )
                    )
                  }
                  checked={gender === "male"}
                />
                Мужчина
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) =>
                    dispatch(
                      setGenderAction(
                        e.currentTarget.value as "male" | "female"
                      )
                    )
                  }
                  checked={gender === "female"}
                />
                Женщина
              </label>

              <div className={styles.employeeFormField_flex}>
                <label>Уволен:</label>
                <input
                  placeholder="123"
                  type="checkbox"
                  checked={isFired}
                  onChange={(e) => dispatch(setIsFiredAction(e.target.checked))}
                />
              </div>

              <div className={styles.employeeFormField_error}>{error}</div>

              {activeId === "-1" && <Button onClick={onAdd}>Добавить</Button>}
            </div>
          </>
        ) : (
          <p>Выберите сотрудника для редактирования или добавьте нового</p>
        )}
      </div>
    </>
  );
};

export default EmployeeFormField;
