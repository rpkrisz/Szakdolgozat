import {Task} from "@/types";
import {isEmpty} from "lodash";

const countTasksPerMonthToSubject = (tasks: Task[]) => {
  const tasksPerMonth: number[] = [];
  if (isEmpty(tasks)) return tasksPerMonth;
  for (const task of tasks) {
    const month = new Date(task.dueDate).getMonth();
    tasksPerMonth[month] = (tasksPerMonth[month] || 0) + 1;
  }
  return tasksPerMonth;
};

export default countTasksPerMonthToSubject;
