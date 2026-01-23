import "./styles.css";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
