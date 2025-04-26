import {FC, ReactNode} from "react";

const ToolTip: FC<{
  text: string;
  className?: string;
  orientation?: "tooltip-top" | "tooltip-left" | "tooltip-bottom" | "tooltip-right";
  color?:
    | "tooltip-primary"
    | "tooltip-secondary"
    | "tooltip-accent"
    | "tooltip-neutral"
    | "tooltip-info"
    | "tooltip-success"
    | "tooltip-warning"
    | "tooltip-error";
  isOpen?: boolean;
  children: ReactNode;
}> = ({text, className, orientation, color, isOpen, children}) => {
  return (
    <div className={`tooltip ${color} ${orientation} ${className} ${isOpen ? "tooltip-open" : ""}`} data-tip={text}>
      {children}
    </div>
  );
};

export default ToolTip;
