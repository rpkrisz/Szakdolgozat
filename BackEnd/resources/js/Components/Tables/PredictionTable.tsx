import {FC} from "react";
import {getAVG, getCCI, getCI, getWAVG} from "@/repositories/SemesterRepository";
import {Subject} from "@/types/Subject";
import GradeTable from "@/Components/Tables/GradeTable";

const PredictionTables: FC<{subjects: Subject[]; title: string; baseGrade: number}> = ({
  subjects,
  title,
  baseGrade,
}) => {
  const gradedSubjects = subjects.map(subject => {
    return {...subject, grade: subject.isGraded ? subject.grade : baseGrade};
  });

  const averages = {
    average: getAVG(gradedSubjects),
    weightedAverage: getWAVG(gradedSubjects),
    creditIndex: getCI(gradedSubjects),
    correctedCreditIndex: getCCI(gradedSubjects),
  };

  return (
    <>
      <div className="overflow-x-auto m-2 my-5">
        <h2 className="font-bold text-lg bg-primary p-3">{title}</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Average</th>
              <th className="text-center">Grade Point Average</th>
              <th className="text-center">Credit Index</th>
              <th className="text-center">Corrected Credit Index</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th className="text-center">{averages.average}</th>
              <th className="text-center">{averages.weightedAverage}</th>
              <th className="text-center">{averages.creditIndex}</th>
              <th className="text-center">{averages.correctedCreditIndex}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <GradeTable subjects={subjects} baseGrade={baseGrade}></GradeTable>
    </>
  );
};
export default PredictionTables;
