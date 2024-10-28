// IEmployee.ts

interface IEmployee {
  id: string;
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
  colleagues: IEmployee []
}

export default IEmployee;
