import {openModal} from "@/utils/";
import {AddTaskModal, EditSubjectDetailsModal, modalNames} from "@/components/Modals";
import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {SubjectCard} from "@/components/DetailsCards";
import {SubjectOverview} from "@/components/Tables/Overviews";
import {TasksTable} from "@/components/Tables";
import {useSetAtom} from "jotai/react";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {Loading} from "@/components/Feedbacks";
import {useGetSubject, useGetSubjectTasks} from "@/services";

const Subject: FC = () => {
  const {subjectID} = useParams();

  const [subject] = useGetSubject(subjectID!);
  const [tasks] = useGetSubjectTasks(subjectID!);

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!subject || !subject.name) return;
    setTitle(subject.name);
  }, [subject, setTitle]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    if (!subject || !subject.universityID || !subject.semesterID) return;
    setRoutes([
      {to: "/", name: "Home"},
      {to: `/universities/${subject?.universityID}`, name: "University"},
      {to: `/semesters/${subject?.universityID}/${subject?.semesterID}`, name: "Semester"},
    ]);
  }, [setRoutes, subject]);

  if (!subject) return <Loading />;

  return (
    <>
      <div className="flex flex-row justify-end gap-2">
        <button className="btn btn-accent" onClick={() => openModal(modalNames.AddTaskModal)}>
          Add new Task
        </button>
        <AddTaskModal
          subjectID={Number(subjectID)}
          universityID={subject.universityID}
          semesterID={subject.semesterID}
        />
        <button className="btn btn-primary" onClick={() => openModal(modalNames.EditSubjectDetailsModal)}>
          Edit Subject details
        </button>
        <EditSubjectDetailsModal subjectData={subject} />
      </div>
      <SubjectCard subject={subject} />
      <SubjectOverview subjects={[subject]}></SubjectOverview>
      <h1 className="bg-primary text-primary-content p-2 text-2xl my-2">Tasks</h1>
      <TasksTable tasks={tasks}></TasksTable>
    </>
  );
};

export default Subject;
