import {FC} from "react";

const SubjectSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-end gap-2">
        <div className="skeleton h-12 w-28"></div>
        <div className="skeleton h-12 w-28"></div>
      </div>
      <div className="skeleton h-96 w-full"></div>
      <div className="skeleton h-24 w-full"></div>
      <div className="skeleton h-72 w-full"></div>
    </div>
  );
};

export default SubjectSkeleton;
