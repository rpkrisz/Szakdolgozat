import {rowDecorator} from "@/lib";
import {Subject} from "@/types/Subject";
import { Link } from "@inertiajs/react";
import {FC} from "react";
// import {Link} from "react-router-dom";

const GradeTable: FC<{subjects: Subject[]; baseGrade?: number}> = ({subjects, baseGrade}) => {
  subjects.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th className="text-center">Credit</th>
            <th className="text-center">Grade</th>
            <th className="text-center">Weighted Credit</th>
          </tr>
        </thead>
        <tbody>
          {subjects?.map(subject => {
            const {id, name, grade, credit, isGraded} = subject;
            return (
              <tr key={id} className={`hover ${rowDecorator(isGraded, grade)} hover:text-neutral-content`}>
                <th className="text-start">
                  <Link href={`/subjects/${id}`}>{name}</Link>
                </th>
                <td className="text-center">{isGraded ? grade : baseGrade}</td>
                <td className="text-center">{credit}</td>
                <td className="text-center">{isGraded  ? grade * credit : baseGrade! * credit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default GradeTable;
