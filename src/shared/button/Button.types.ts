// Button.types.ts

import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default IButtonProps;
