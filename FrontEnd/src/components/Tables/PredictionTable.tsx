import {FC} from "react";
import {getAVG, getCCI, getCI, getGPA} from "@/utils/SemesterAverageFunctions";
import {Subject} from "@/types";
import GradeTable from "./GradeTable";

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
    weightedAverage: getGPA(gradedSubjects),
    creditIndex: getCI(gradedSubjects),
    correctedCreditIndex: getCCI(gradedSubjects),
  };

  return (
    <div className="text-base-content bg-base-200">
      <div className="overflow-x-auto m-2 my-5">
        <h2 className="font-bold text-lg bg-primary text-primary-content p-3">{title}</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Average</th>
              <th className="text-center">Weighted Average</th>
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
    </div>
  );
};
export default PredictionTables;
