// main/index.tsx

import React, { FC } from "react";
import EmployeesPanel from "@/modules/employee/employeesPanel/EmployeesPanel";

const MainPage: FC = (): JSX.Element => {
  return (
    <>
      <EmployeesPanel />
    </>
  );
};

export default MainPage;
