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
import IEmployee from "@/types/models/IEmployee";
import filterEmployees from "@/utils/filterEmployees";

// Локальная переменная ролей для выбора должности (поле "Должность")
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

// Поле для заполнения данных о работнике. Оно работает как для добавления, так и для обновления данных
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
    setColleguesAction,
    setRemoveCollegueAction,
    setResetEmployeeAction,
  } = employeeSlice.actions;
  const {
    activeId,
    employees,
    id,
    fullName,
    position,
    birthDate,
    gender,
    isFired,
    colleagues,
  } = useAppSelector((state) => state.employeeReducer);

  const [error, setError] = useState<string | null>(null);

  const filteredEmployees = filterEmployees({
    employees,
    id: id!,
    colleagues,
  });

  /* 
  Debounce для изменения данных без постоянной отправки изменения на сервер. 
  В интерфейсе нет кнопки "Сохранить изменения", они происходят автоматически при изменении одной из компонент
  fullName, position, birthDate, gender, isFired, colleagues
  Но это происходит не при каждом тике, а при прошествии 500 мс и без последующих изменений
  */
  useEffect(() => {
    // Если нет активного ID, ничего не делаем (для заполнения поля в статусе "Добавить работника")
    if (!activeId || activeId === "-1") return;

    const handler = setTimeout(async () => onUpdate(), 500);

    // Очищаем таймер при изменении зависимостей
    return () => clearTimeout(handler);
  }, [fullName, position, birthDate, gender, isFired, colleagues]);

  const validateForm = (): string | null => {
    if (!fullName) return "Введите ФИО полностью";
    if (!position) return "Выберите должность";
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
  }, [fullName, position, birthDate, gender, isFired, colleagues]);

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
  }, [fullName, position, birthDate, gender, isFired, colleagues]);

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
        colleagues,
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
        colleagues,
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

              {/* Заполнение ФИО */}
              <div>
                <label>*ФИО:</label>
                <input
                  placeholder="Иванов Иван Иванович"
                  type="text"
                  value={fullName}
                  onChange={(e) => dispatch(setFullNameAction(e.target.value))}
                />
              </div>

              {/* Выбор должности */}
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

              {/* Выбор даты рождения */}
              <div>
                <label>Дата рождения:</label>
                <input
                  placeholder="01.01.2004"
                  type="date"
                  value={birthDate}
                  onChange={(e) => dispatch(setBirthDateAction(e.target.value))}
                />
              </div>

              {/* Выбор статуса "Пол" */}
              <div className={styles.employeeFormField_flex}>
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
              </div>

              {/* Выбор статуса "Уволен" */}
              <div className={styles.employeeFormField_flex}>
                <label>Уволен:</label>
                <input
                  placeholder="Уволен"
                  type="checkbox"
                  checked={isFired}
                  onChange={(e) => dispatch(setIsFiredAction(e.target.checked))}
                />
              </div>

              <div>
                <label>Коллеги:</label>
                {/* Уже добавленные коллеги */}
                {Array.from({ length: colleagues.length }, (_, i) => i + 1).map(
                  (num) => (
                    <div className={styles.employeeFormField_flex}>
                      <select
                        title="Коллеги"
                        value={colleagues[num - 1].id}
                        onChange={(e) => {
                          const colleague = employees.filter(
                            (employee) => employee.id === e.target.value
                          )[0];
                          dispatch(
                            setColleguesAction({
                              employee: colleague,
                              index: num - 1,
                            })
                          );
                        }}
                      >
                        <option disabled={true} value="">
                          Выберите должность
                        </option>
                        {[colleagues[num - 1], ...filteredEmployees].map(
                          (employee: IEmployee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.fullName}
                            </option>
                          )
                        )}
                      </select>
                      <Button
                        onClick={() => {
                          dispatch(setRemoveCollegueAction(num - 1));
                        }}
                      >
                        Удалить
                      </Button>
                    </div>
                  )
                )}

                {/*  Последний select для добавления ещё одного коллеги */}
                {filteredEmployees.length ? (
                  <div className={styles.employeeFormField_flex}>
                    <select
                      title="Коллеги"
                      value=""
                      onChange={(e) => {
                        const colleague = employees.filter(
                          (employee) => employee.id === e.target.value
                        )[0];
                        dispatch(
                          setColleguesAction({
                            employee: colleague,
                            index: colleagues.length,
                          })
                        );
                      }}
                    >
                      <option disabled={true} value="">
                        Выберите должность
                      </option>
                      {filteredEmployees.map((employee: IEmployee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
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
