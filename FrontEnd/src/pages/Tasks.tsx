import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSetAtom} from "jotai/react";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {AddTaskModal, modalNames} from "@/components/Modals";
import {openModal} from "@/utils/";
import {Loading} from "@/components/Feedbacks";
import TasksTable from "@/components/Tables/TaskTable/TasksTable";
import useRelevantTasks from "@/hooks/useRelevantTasks";

const Tasks: FC = () => {
  const {semesterID, universityID} = useParams();
  const [maxTasksPerMonth, tasks, subjects] = useRelevantTasks();

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!universityID && !semesterID) setTitle("Tasks");
    if (universityID && !semesterID) setTitle("University Tasks");
    if (universityID && semesterID) setTitle("Semester Tasks");
  }, [setTitle, universityID, semesterID]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    if (!universityID && !semesterID) setRoutes([{to: "/", name: "Home"}]);
    if (universityID && !semesterID)
      setRoutes([
        {to: "/", name: "Home"},
        {to: `/universities/${universityID}`, name: "University"},
      ]);
    if (universityID && semesterID)
      setRoutes([
        {to: "/", name: "Home"},
        {to: `/universities/${universityID}`, name: "University"},
        {to: `/semesters/${universityID}/${semesterID}`, name: "Semester"},
      ]);
  }, [setRoutes, universityID, semesterID]);

  if (!subjects || !tasks) return <Loading />;

  return (
    <>
      <div className="flex flex-row justify-end gap-2">
        <button className="btn btn-primary" onClick={() => openModal(modalNames.AddTaskModal)}>
          Add new Task
        </button>
        <AddTaskModal semesterID={Number(semesterID ?? undefined)} universityID={Number(universityID) ?? undefined} />
      </div>
      <TasksTable tasks={[maxTasksPerMonth, tasks!]} subjects={subjects}></TasksTable>
    </>
  );
};

export default Tasks;
