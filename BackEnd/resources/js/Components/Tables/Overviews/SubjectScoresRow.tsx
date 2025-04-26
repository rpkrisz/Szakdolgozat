import {FC} from "react";
// import {Link, useParams} from "react-router-dom";
import {Subject} from "@/types/Subject";
// import {getGrade} from "@/repositories/SubjectRepository";
import {round} from "lodash";
import {useAsync} from "react-use";
import {rowDecorator} from "@/lib";
import {Link} from "@inertiajs/react";

const SubjectScoresRow: FC<{subject: Subject; subjectNameOn: boolean}> = ({subject, subjectNameOn}) => {
  //   const {semesterID} = useParams();

  const {id, name, grade, scores, isGraded} = subject;
  const {midterms, assignments, quizes, bonusPoints, exams, sumScores, maxScore} = scores;

  const {value} = useAsync(async () => {
    // return isGraded ? grade : await getGrade(subject);
    return -1;
  }, [subject, subjectNameOn]);

  return (
    <tr key={id} className={`hover ${rowDecorator(isGraded, grade)} hover:text-neutral-content`}>
      {subjectNameOn && (
        <th className={`${rowDecorator(isGraded, grade)} text-start`}>
          <Link href={`/subjects/${id}`}>{name}</Link>
        </th>
      )}
      <td className="text-center">{midterms}</td>
      <td className="text-center">{assignments}</td>
      <td className="text-center">{quizes}</td>
      <td className="text-center">{bonusPoints}</td>
      <td className="text-center">{exams}</td>
      <td className="text-center">{sumScores}</td>
      <td className="text-center">{maxScore}</td>
      <td className="text-center">{isNaN(sumScores / maxScore) ? 0 : round((sumScores / maxScore) * 100, 2)}</td>
      <td className="text-center">{value ?? 0}</td>
    </tr>
  );
};

export default SubjectScoresRow;
