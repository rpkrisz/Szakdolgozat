import {FC} from "react";

const UniversitySkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-4">
        <div className="flex gap-2">
          <div className="skeleton h-12 w-28"></div>
          <div className="skeleton h-12 w-28"></div>
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-12 w-28"></div>
          <div className="skeleton h-12 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-60 w-full"></div>
      <div className="skeleton h-60 w-full"></div>
    </div>
  );
};

export default UniversitySkeleton;
