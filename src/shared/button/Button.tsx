// Button.tsx

import React, { FC, memo } from "react";
import styles from './Button.module.scss';
import  IButtonProps  from "./Button.types";

const Button: FC<IButtonProps> = memo(
  ({
    children,
    onClick,
    disabled = false,
    type = "button",
  }): JSX.Element => {
    return (
      <button
        type={type}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default Button;
