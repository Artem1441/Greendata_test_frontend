// Modal.types.ts

import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  closeAction: () => void;
}

export default IModalProps;
