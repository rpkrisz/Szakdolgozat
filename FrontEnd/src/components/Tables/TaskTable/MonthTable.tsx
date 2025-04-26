import {FC} from "react";
import TaskTr from "./TaskTr";
import {Task} from "@/types";

const MonthTable: FC<{
  month: number;
  data: {tasks: Task[]; tasksPerMonth: number[]}[];
  taskNum: number;
}> = ({month, data, taskNum}) => {
  return (
    <table
      className={`flex flex-col ${
        month % 2 === 0 ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
      } bg-opacity-35`}
    >
      <thead>
        <tr
          className={`flex justify-center ${
            month % 2 === 0 ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
          } bg-opacity-90`}
        >
          <th>{new Date(0, month).toLocaleString("en-US", {month: "long"})}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => {
          return <TaskTr key={index} data={data} month={month} taskNum={taskNum} />;
        })}
      </tbody>
    </table>
  );
};

export default MonthTable;
