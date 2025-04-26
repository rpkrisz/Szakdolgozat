import {FC} from "react";

const EmptyTds: FC<{taskNum: number; tasksPerMonth: number}> = ({taskNum, tasksPerMonth}) => {
  if (!taskNum || taskNum - tasksPerMonth === 0) return;
  const spaces = [];
  const diff = tasksPerMonth ? taskNum - tasksPerMonth : taskNum;

  for (let index = 0; index < diff; index++) {
    spaces.push(0);
  }

  return (
    <>
      {spaces.map((_, index) => {
        return <td key={index} className="taskTdBase bg-opacity-10 bg-black"></td>;
      })}
    </>
  );
};

export default EmptyTds;
