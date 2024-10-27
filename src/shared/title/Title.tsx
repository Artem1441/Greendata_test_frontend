// Title.tsx

import React, { FC, memo } from "react";
import styles from "./Title.module.scss";
import ITitleProps from "./Title.types";

const Title: FC<ITitleProps> = memo(({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
});

export default Title;
