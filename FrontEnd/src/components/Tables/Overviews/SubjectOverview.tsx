import {FC} from "react";
import {useParams} from "react-router-dom";
import {Subject} from "@/types";
import SubjectScoresRow from "./SubjectScoresRow";

const SubjectOverview: FC<{subjects: Subject[]}> = ({subjects}) => {
  const {semesterID} = useParams();

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-cols">
        <thead>
          <tr>
            {semesterID && <th className="text-center">Subject</th>}
            <td className="text-center">Midterms</td>
            <td className="text-center">Assignments</td>
            <td className="text-center">Quizes</td>
            <td className="text-center">Bonus points</td>
            <td className="text-center">Final exam score</td>
            <td className="text-center">Sum</td>
            <td className="text-center">Max score</td>
            <td className="text-center">%</td>
            <td className="text-center">Grade</td>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => {
            return <SubjectScoresRow key={subject.id + subject.name} subject={subject} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectOverview;
