import {rowDecorator} from "@/utils/";
import {Subject} from "@/types";
import {FC} from "react";
import {Link} from "react-router-dom";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from "recharts";

const GradeTable: FC<{subjects: Subject[]; baseGrade: number}> = ({subjects, baseGrade}) => {
  subjects.sort((a, b) => a.name.localeCompare(b.name));
  const subjectsData = subjects.map(({id, name, grade, credit, isGraded}) => {
    return {
      id,
      name,
      credit,
      isGraded,
      grade: isGraded ? grade : baseGrade,
      weightedCredit: isGraded ? grade * credit : baseGrade! * credit,
    };
  });

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4">
      <div className="m-2">
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th className="text-center">Grade</th>
              <th className="text-center">Credit</th>
              <th className="text-center">Weighted Credit</th>
            </tr>
          </thead>
          <tbody>
            {subjectsData?.map(subject => {
              const {id, name, grade, credit, isGraded, weightedCredit} = subject;
              return (
                <tr key={id} className={`hover ${rowDecorator(isGraded, grade)} hover:text-neutral-content`}>
                  <th className="text-start">
                    <Link to={`/subjects/${id}`}>{name}</Link>
                  </th>
                  <td className="text-center">{grade}</td>
                  <td className="text-center">{credit}</td>
                  <td className="text-center">{weightedCredit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <RadarChart cy="60%" cx="50%" outerRadius="80%" width={300} height={200} data={subjectsData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={45} domain={[1, 5]} />
          <Radar dataKey="grade" stroke="#8884d8" fill="green" fillOpacity={0.6} />
        </RadarChart>
      </div>
    </div>
  );
};
export default GradeTable;
