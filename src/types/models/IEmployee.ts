// IEmployee.ts

interface IEmployee {
  id: string;
  fullName: string;
  position: string;
  birthDate: string;
  gender: "male" | "female";
  isFired: boolean;
}

export default IEmployee;
