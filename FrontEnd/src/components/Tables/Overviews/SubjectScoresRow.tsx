import {FC} from "react";
import {Link, useParams} from "react-router-dom";
import {Subject} from "@/types";
import {round} from "lodash";
import {rowDecorator, calculateGrade} from "@/utils/";

const SubjectScoresRow: FC<{subject: Subject}> = ({subject}) => {
  const {semesterID} = useParams();

  const {id, name, grade, isGraded} = subject;
  const {midterms, assignments, quizes, bonusPoints, exams, sumScores, maxScore} = subject;

  let calculatedGrade = 0;

  if (subject.isPercentage) {
    calculatedGrade = calculateGrade(subject, (sumScores / maxScore) * 100);
  } else {
    calculatedGrade = calculateGrade(subject, sumScores);
  }

  return (
    <tr key={id} className={`hover ${rowDecorator(isGraded, grade)} hover:text-neutral-content`}>
      {semesterID && (
        <th className={`${rowDecorator(isGraded, grade)} text-start`}>
          <Link to={`/subjects/${id}`}>{name}</Link>
        </th>
      )}
      <td className="text-center">{round(midterms, 2)}</td>
      <td className="text-center">{round(assignments, 2)}</td>
      <td className="text-center">{round(quizes, 2)}</td>
      <td className="text-center">{round(bonusPoints, 2)}</td>
      <td className="text-center">{round(exams, 2)}</td>
      <td className="text-center">{round(sumScores, 2)}</td>
      <td className="text-center">{round(maxScore, 2)}</td>
      <td className="text-center">{isNaN(sumScores / maxScore) ? 0 : round((sumScores / maxScore) * 100, 2)}</td>
      <td className="text-center">{isGraded ? grade : calculatedGrade}</td>
    </tr>
  );
};

export default SubjectScoresRow;
