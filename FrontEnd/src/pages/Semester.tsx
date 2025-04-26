import {openModal} from "@/utils/";
import {FC, useEffect} from "react";
import {SemesterOverview, SubjectOverview} from "@/components/Tables/Overviews";
import {Link, useParams} from "react-router-dom";
import {useSetAtom} from "jotai/react";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {CreateSubjectModal, AddTaskModal, modalNames} from "@/components/Modals";
import {useGetSemester, useGetSemesterSubjects, useGetUniversityNames} from "@/services";

const Semester: FC = () => {
  const {universityID, semesterID} = useParams();
  const [semester] = useGetSemester(semesterID!);
  const [subjects] = useGetSemesterSubjects(semesterID!);
  const [universitiyNames] = useGetUniversityNames(universityID!);

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!semester || !semester.name || !universitiyNames) return;
    setTitle(universitiyNames.nickName + " " + semester.name!);
  }, [semester, universitiyNames, setTitle]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    if (!universityID) return;
    setRoutes([
      {to: "/", name: "Home"},
      {to: `/universities/${universityID}`, name: "University"},
    ]);
  }, [setRoutes, universityID]);

  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Link className="btn btn-primary" to="tasks">
            Tasks
          </Link>
          <Link className="btn btn-primary" to="predictions">
            {subjects.every(subject => subject.isGraded) ? "Appraisal" : "Predictions"}
          </Link>
          <Link className="btn btn-primary" to="weekly_time_consumptions">
            Time consumptions
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => openModal(modalNames.AddTaskModal)}>
            Add new Task
          </button>
          <AddTaskModal universityID={Number(universityID)} semesterID={Number(semesterID)} />
          <button className="btn btn-accent" onClick={() => openModal(modalNames.CreateSubjectModal)}>
            Add new Subject
          </button>
          <CreateSubjectModal universityID={Number(universityID)} semesterID={Number(semesterID)} />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <SemesterOverview semesters={[semester!]} />
        <SubjectOverview subjects={subjects}></SubjectOverview>
      </div>
    </>
  );
};

export default Semester;
