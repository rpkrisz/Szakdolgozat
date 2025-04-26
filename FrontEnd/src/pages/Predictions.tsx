import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {PredictionTable} from "@/components/Tables";
import {useGetSemester, useGetSemesterSubjects, useGetUniversityNames} from "@/services";

const Predictions: FC = () => {
  const {universityID, semesterID} = useParams();

  const [semester] = useGetSemester(semesterID!);
  const [subjects] = useGetSemesterSubjects(semesterID!);
  const [universitiyNames] = useGetUniversityNames(universityID!);

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!semester || !semester.name || !universitiyNames) return;
    setTitle(universitiyNames.nickName + " " + semester.name! + " Predictions");
  });

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([
      {to: "/home", name: "Home"},
      {to: `/universities/${universityID}`, name: "University"},
      {to: `/semesters/${universityID}/${semesterID}`, name: "Semester"},
    ]);
  }, [setRoutes, universityID, semesterID]);

  const closedSemester = subjects.every(subject => subject.isGraded);

  return (
    <>
      <div className="flex flex-col gap-10 ">
        {closedSemester ? (
          <PredictionTable subjects={subjects} title="Appraisal" baseGrade={2}></PredictionTable>
        ) : (
          <>
            <PredictionTable subjects={subjects} title="Enough" baseGrade={2}></PredictionTable>
            <PredictionTable subjects={subjects} title="Okey" baseGrade={3}></PredictionTable>
            <PredictionTable subjects={subjects} title="Good" baseGrade={4}></PredictionTable>
            <PredictionTable subjects={subjects} title="Perfect" baseGrade={5}></PredictionTable>
          </>
        )}
      </div>
    </>
  );
};

export default Predictions;
