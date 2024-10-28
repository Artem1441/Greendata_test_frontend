// IFilterEmployees.types.ts

import IEmployee from "../models/IEmployee";

interface IFilterEmployees {
    employees: IEmployee[],
    id: string,
    colleagues: IEmployee[],
}

export default IFilterEmployees
