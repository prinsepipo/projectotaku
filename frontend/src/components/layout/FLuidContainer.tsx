import type React from "react";

import "./FluidContainer.css";

interface IFluidContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

function FluidContainer({ id, className, children }: IFluidContainerProps) {
  const classes = ["fluid-container", className].filter(Boolean).join(" ");
  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
}

export default FluidContainer;
