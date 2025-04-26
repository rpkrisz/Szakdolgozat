import {FC} from "react";
import MonthTable from "./MonthTable";
import {isEmpty} from "lodash";
import TaskTableHeaders from "./TaskTableHeaders";
import ColorNotationTable from "@/components/Tables/ColorNotationTable";
import {useGetUrgentTasks} from "@/services";
import {TaskSelectionType} from "@/types";
import {countTasksPerMonthToSubject} from "@/utils/";

const UrgentTasks: FC = () => {
  const [[, inWeekTasks, nearBigTasks]] = useGetUrgentTasks();

  const taskSelections = [
    [
      "",
      [
        {
          id: "inWeekTasks",
          name: "In week tasks",
          tasks: inWeekTasks,
          tasksPerMonth: countTasksPerMonthToSubject(inWeekTasks!),
        },
        {
          id: "nearBigTasks",
          name: "Near big tasks",
          tasks: nearBigTasks,
          tasksPerMonth: countTasksPerMonthToSubject(nearBigTasks!),
        },
      ],
    ],
  ] as TaskSelectionType;

  const maxTaskPerMonth = taskSelections[0][1][1].tasksPerMonth.map((taskNumA, index) => {
    const taskNumB = taskSelections[0][1][0].tasksPerMonth[index];
    return taskNumA > taskNumB ? taskNumA : taskNumB;
  });

  if (isEmpty(taskSelections)) return <p className="text-center font-bold text-3xl">No tasks available!</p>;

  return (
    <>
      <ColorNotationTable />
      <div className="overflow-x-auto">
        {taskSelections.map(([filter, tasktypes]) => {
          return (
            <TaskTableHeaders key={filter} title={"Urgent tasks"} headers={tasktypes} headerTitle="Type">
              {maxTaskPerMonth.map((taskNum, index) => {
                if (!taskNum) return;
                return <MonthTable key={index} data={tasktypes} month={index} taskNum={taskNum} />;
              })}
            </TaskTableHeaders>
          );
        })}
      </div>
    </>
  );
};

export default UrgentTasks;
