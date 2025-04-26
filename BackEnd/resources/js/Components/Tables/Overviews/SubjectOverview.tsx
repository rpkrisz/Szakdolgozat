import {FC} from "react";
// import {useParams} from "react-router-dom";
import {Subject} from "@/types/Subject";
import SubjectScoresRow from "@/Components/Tables/Overviews/SubjectScoresRow";

const SubjectOverview: FC<{subjects: Subject[]; subjectNameOn: boolean}> = ({subjects, subjectNameOn}) => {
  //   const {semesterID} = useParams();

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-cols">
        <thead>
          <tr>
            {subjectNameOn && <th className="text-center">Subject</th>}
            <td className="text-center">Midterms</td>
            <td className="text-center">Assignments</td>
            <td className="text-center">Quizes</td>
            <td className="text-center">Bonus points</td>
            <td className="text-center">Final exam score</td>
            <td className="text-center">Summ</td>
            <td className="text-center">Max score</td>
            <td className="text-center">%</td>
            <td className="text-center">Grade</td>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => {
            return <SubjectScoresRow key={subject.id + subject.name} subject={subject} subjectNameOn={true} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectOverview;
