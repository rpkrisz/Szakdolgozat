import {FC, useEffect, useMemo, useState} from "react";
import MonthTable from "./MonthTable";
import {isEmpty} from "lodash";
import TaskTableHeaders from "./TaskTableHeaders";
import ColorNotationTable from "@/components/Tables/TaskTable/ColorNotationTable";
import {useGetUrgentTasks} from "@/services";
import {TaskSelectionType} from "@/types";
import {countTasksPerMonthToSubject} from "@/utils/";

const UrgentTasks: FC = () => {
  const [[max, inWeekTasks, nearBigTasks]] = useGetUrgentTasks();
  const [maxTaskPerMonth, setMaxTaskPerMonth] = useState(max);

  const taskSelections = useMemo(
    () =>
      [
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
      ] as TaskSelectionType,
    [inWeekTasks, nearBigTasks]
  );

  useEffect(() => {
    if (isEmpty(taskSelections[0][1][1].tasksPerMonth) || isEmpty(taskSelections[0][1][0].tasksPerMonth)) return;
    const realMax = taskSelections[0][1][1].tasksPerMonth.map((taskNumA, index) => {
      const taskNumB = taskSelections[0][1][0].tasksPerMonth[index];
      return taskNumA > taskNumB ? taskNumA : taskNumB;
    });
    setMaxTaskPerMonth(realMax);
  }, [taskSelections]);

  if (isEmpty(taskSelections)) return <p className="text-center font-bold text-3xl">No tasks available!</p>;

  return (
    <>
      <ColorNotationTable />
      <div className="overflow-x-auto">
        {taskSelections.map(([filter, tasktypes]) => {
          return (
            <TaskTableHeaders key={filter} title={"Urgent tasks"} headers={tasktypes} headerTitle="Type">
              {maxTaskPerMonth?.map((taskNum, index) => {
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
