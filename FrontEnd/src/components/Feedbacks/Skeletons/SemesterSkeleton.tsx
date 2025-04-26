import {FC} from "react";

const SemesterSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div className="skeleton h-12 w-28"></div>
          <div className="skeleton h-12 w-28"></div>
          <div className="skeleton h-12 w-28"></div>
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-12 w-28"></div>
          <div className="skeleton h-12 w-28"></div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    </div>
  );
};

export default SemesterSkeleton;
