import {FC, useEffect, useState} from "react";
import {Task, TaskShowDataType, Subject} from "@/types";
import {useParams} from "react-router-dom";
import MonthTable from "./MonthTable";
import {entries, groupBy, isEmpty} from "lodash";
import TaskTableHeaders from "./TaskTableHeaders";
import ColorNotationTable from "@/components/Tables/ColorNotationTable";
import {useGetUniversitiesNames} from "@/services";
import {useAtomValue} from "jotai/react";
import {userAtom} from "@/store/atoms";
import {maxTasksPerMonth, countTasksPerMonthToSubject} from "@/utils/";

const TasksTable: FC<{tasks: [number[], Task[]]; subjects?: Subject[]}> = ({tasks, subjects}) => {
  const {subjectID, semesterID, universityID} = useParams();
  const [taskListTasksPerMonth, taskList] = tasks;
  const [universities] = useGetUniversitiesNames();
  const [data, setData] = useState<TaskShowDataType[]>([["", []]]);
  const [maxTaskPerMonth, setMaxTaskPerMonth] = useState<number[]>([]);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (isEmpty(taskList)) return;

    let newData: TaskShowDataType[] = [];
    const maxTaskPerMonthTEMP: number[] = [];

    // Subject's tasks
    if (!universityID && !semesterID && subjectID) {
      newData = [
        ["", [{id: taskList[0].subjectID, name: "Subject", tasks: taskList, tasksPerMonth: taskListTasksPerMonth}]],
      ];
      maxTaskPerMonthTEMP.push(...taskListTasksPerMonth);
    }

    // Semester's tasks
    if (universityID && semesterID && subjects && !subjectID) {
      const taskGrouping = groupBy(taskList, "subjectID");
      const subdata = subjects.map(subject => {
        const tasks = taskGrouping[subject.id];
        const tasksPerMonth = countTasksPerMonthToSubject(tasks);
        maxTasksPerMonth(tasksPerMonth, maxTaskPerMonthTEMP);
        return {
          id: subject.id,
          name: subject.name,
          tasks,
          tasksPerMonth,
        };
      });
      newData = [["", subdata]];
    }

    // University's tasks
    if (universityID && !semesterID && subjects && !subjectID) {
      const taskGrouping = groupBy(taskList, "subjectID");
      const subdata = subjects.map(subject => {
        const tasks = taskGrouping[subject.id];
        const tasksPerMonth = countTasksPerMonthToSubject(tasks);
        maxTasksPerMonth(tasksPerMonth, maxTaskPerMonthTEMP);
        return {
          id: subject.id,
          semesterID: subject.semesterID,
          name: subject.name,
          tasks,
          tasksPerMonth,
        };
      });
      newData = entries(groupBy(subdata, "semesterID")).reverse();
    }

    // Relevant tasks
    if (!universityID && !semesterID && subjects && !subjectID) {
      const taskGrouping = groupBy(taskList, "subjectID");
      const subdata = subjects.map(subject => {
        const tasks = taskGrouping[subject.id];
        const tasksPerMonth = countTasksPerMonthToSubject(tasks);
        maxTasksPerMonth(tasksPerMonth, maxTaskPerMonthTEMP);
        return {
          id: subject.id,
          universityID: subject.universityID,
          name: subject.name,
          tasks,
          tasksPerMonth,
        };
      });

      newData = entries(groupBy(subdata, "universityID")).map(([id, data]) => {
        const name = universities.find(a => a.id == Number(id))?.name;
        const semester = user.data?.unidata.find(a => a.id == Number(id))?.semester;
        const newID = `${name} Semester ${semester}`;

        return [newID, data];
      });
    }

    setData([...newData]);
    setMaxTaskPerMonth([...maxTaskPerMonthTEMP]);
  }, [
    subjectID,
    semesterID,
    universityID,
    taskList,
    taskListTasksPerMonth,
    subjects,
    universities,
    user.data?.unidata,
  ]);

  if (isEmpty(taskList) || isEmpty(data))
    return (
      <>
        <ColorNotationTable />
        <p className="text-center font-bold text-3xl m-6">No task available!</p>
      </>
    );

  return (
    <>
      <ColorNotationTable />
      <div className="overflow-x-auto">
        {data.map(([filter, subjects]) => {
          return (
            <TaskTableHeaders key={filter} title={filter} headers={subjects} headerTitle="Subjects">
              {maxTaskPerMonth.map((taskNum, index) => {
                if (!taskNum) return;
                return <MonthTable key={index} data={subjects} month={Number(index)} taskNum={taskNum} />;
              })}
            </TaskTableHeaders>
          );
        })}
      </div>
    </>
  );
};

export default TasksTable;
