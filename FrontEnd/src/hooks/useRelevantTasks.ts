import {useGetSubjects, useGetTasks} from "@/services";
import {userAtom} from "@/store/atoms";
import {Subject, Task} from "@/types";
import {useAtomValue} from "jotai/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const useRelevantTasks = () => {
  const {semesterID, universityID} = useParams();
  const [subjects, setSubjects] = useState<Subject[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [allSubjects] = useGetSubjects();
  const [[maxTasksPerMonth, allTasks]] = useGetTasks();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    let subjects: Subject[] = [];
    let tasks: Task[] = [];

    if (universityID) {
      subjects = allSubjects.filter(subject => subject.universityID === Number(universityID));
      tasks = allTasks.filter(task => task.universityID === Number(universityID));
    }
    if (semesterID) {
      subjects = allSubjects.filter(subject => subject.semesterID === Number(semesterID));
      tasks = allTasks.filter(task => task.semesterID === Number(semesterID));
    }

    if (!universityID && !semesterID) {
      const filter = user.data?.unidata;

      for (const unidata of filter!) {
        subjects.push(
          ...allSubjects.filter(
            subject => subject.universityID === unidata.id && subject.semesterID === unidata.semesterID
          )
        );
        tasks.push(
          ...allTasks.filter(task => task.universityID === unidata.id && task.semesterID === unidata.semesterID)
        );
      }
    }

    subjects.sort((a, b) => a.name.localeCompare(b.name));
    setSubjects([...subjects]);
    setTasks([...tasks]);
  }, [semesterID, universityID, allSubjects, allTasks, user.data?.unidata]);

  return [maxTasksPerMonth, tasks, subjects] as [number[], Task[], Subject[]];
};
export default useRelevantTasks;
