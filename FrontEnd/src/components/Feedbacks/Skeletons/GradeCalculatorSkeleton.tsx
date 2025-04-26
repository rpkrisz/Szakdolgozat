import {FC} from "react";

const GradeCalculatorSkeleton: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 max-h-fit min-w-full min-h-full">
        <div className="skeleton h-32 w-full"></div>
        <div className="flex flex-col lg:flex-row justify-stretch items-center lg:gap-20 gap-5 max-h-fit min-w-full min-h-96">
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    </>
  );
};

export default GradeCalculatorSkeleton;
