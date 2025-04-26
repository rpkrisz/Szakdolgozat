import {FC} from "react";
import TaskTd from "./TaskTd";
import EmptyTds from "./EmptyTds";
import {Task} from "@/types";

const TaskTr: FC<{
  data: {tasks: Task[]; tasksPerMonth: number[]};
  month: number;
  taskNum: number;
}> = ({data, month, taskNum}) => {
  const {tasks, tasksPerMonth} = data;

  if (!tasks)
    return (
      <tr className="flex zero:flex-col md:flex-row gap-1 m-1 zero:place-items-center md:place-items-end">
        <EmptyTds taskNum={taskNum} tasksPerMonth={tasksPerMonth[month]} />
      </tr>
    );

  return (
    <tr className="flex zero:flex-col md:flex-row gap-1 m-1 zero:place-items-center md:place-items-end">
      {tasks
        .filter(({dueDate}) => month === new Date(dueDate).getMonth())
        .map(task => {
          return <TaskTd key={task.id} task={task}></TaskTd>;
        })}
      <EmptyTds taskNum={taskNum} tasksPerMonth={tasksPerMonth[month]} />
    </tr>
  );
};

export default TaskTr;
