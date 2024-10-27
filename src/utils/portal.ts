// portal.ts

import { FC, memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  children: React.ReactNode;
}

const Portal: FC<IProps> = memo(({ children }): JSX.Element | null => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? ReactDOM.createPortal(children, document.body) : null;
});

export default Portal;
