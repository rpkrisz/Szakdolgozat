import {FC} from "react";
import {Subject} from "@/types";

const GradeLimits: FC<{subject: Subject}> = ({subject}) => {
  const gradeLimits = [
    {grade: 5, min: subject.pointsFor5, max: subject.isPercentage ? 100 : subject.maxScore},
    {grade: 4, min: subject.pointsFor4, max: subject.pointsFor5 - 1},
    {grade: 3, min: subject.pointsFor3, max: subject.pointsFor4 - 1},
    {grade: 2, min: subject.pointsFor2, max: subject.pointsFor3 - 1},
    {grade: 1, min: 0, max: subject.pointsFor2 - 1},
  ];
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs text-base-content">
        <thead>
          <tr>
            <th scope="col" className="px-2 py-2 text-left text-xs font-medium uppercase">
              Grade
            </th>
            <th scope="col" className="px-2 py-2 text-left text-xs font-medium uppercase">
              Minimum
            </th>
            <th scope="col" className="px-2 py-2 text-left text-xs font-medium uppercase">
              Maximum
            </th>
          </tr>
        </thead>
        <tbody>
          {gradeLimits.map((limit, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-slate-400" : ""}>
              <td className="px-2 py-1 text-sm font-semibold">{limit.grade}</td>
              <td className="px-2 py-1 text-sm">
                {limit.min} {subject.isPercentage ? "%" : ""}
              </td>
              <td className="px-2 py-1 text-sm">
                {limit.max}
                {subject.isPercentage ? "%" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default GradeLimits;
