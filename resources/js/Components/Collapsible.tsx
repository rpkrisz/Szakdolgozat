import {FC, ReactNode} from "react";

const Collapsible: FC<{children: [SummeryTitel: ReactNode, Content: ReactNode]; className?: string}> = ({
  children,
  className,
}) => {
  return (
    <div className={`collapse collapse-arrow bg-base-200 overflow-x-auto ${className}`}>
      <input type="checkbox" />
      <div className="collapse-title">{children[0]}</div>
      <div className="collapse-content">{children[1]}</div>
    </div>
  );
};

export default Collapsible;
