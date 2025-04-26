import {FC, ReactElement} from "react";

const CardBase: FC<{
  children: [titleSectons: ReactElement, content: ReactElement, actionsSection: ReactElement];
}> = ({children}) => {
  return (
    <>
      <div className="card bg-secondary text-secondary-content m-5 shadow-xl">
        <div className="card-body p-0">
          <div className="flex flex-wrap gap-4 items-start mb-4 p-4 border-b border-gray-200">{children[0]}</div>
          <div className="p-4">{children[1]}</div>
          <div className="card-actions justify-end p-4 text-base-content bg-base-300 bg-opacity-10">{children[2]}</div>
        </div>
      </div>
      {}
    </>
  );
};

export default CardBase;
