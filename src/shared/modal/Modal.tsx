// Modal.tsx

import React, { FC, memo } from "react";
import Portal from "@/utils/portal";
import styles from "./Modal.module.scss";
import IModalProps from "./Modal.types";

const Modal: FC<IModalProps> = memo(({ children, closeAction }): JSX.Element => {
  return (
    <>
      <Portal>
        <div className={styles.modal} onClick={closeAction}>
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </Portal>
    </>
  );
});

export default Modal;
