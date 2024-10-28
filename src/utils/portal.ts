// portal.ts

import IPortal from "@/types/utils/IPortal.types";
import { FC, memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";

/* 
Портал, чтобы выносить объекты за пределы id="root" тега. 
В проекте используется, чтобы делать модалки, котрые не наследуют внешние стили
*/
const Portal: FC<IPortal> = memo(({ children }): JSX.Element | null => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? ReactDOM.createPortal(children, document.body) : null;
});

export default Portal;
