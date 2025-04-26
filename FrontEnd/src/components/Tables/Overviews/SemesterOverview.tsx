import {FC} from "react";
import {Link, useParams} from "react-router-dom";
import {Semester} from "@/types";
import {round} from "lodash";

const SemesterOverview: FC<{
  semesters: Semester[];
  universityID?: string;
}> = ({semesters, universityID}) => {
  const {universityID: UID, semesterID: SID} = useParams();
  return (
    <>
      <div className="overflow-x-auto m-2 my-5">
        <table className="table table-pin-cols">
          <thead>
            <tr>
              {semesters.length > 1 && <th className="text-center">Semester</th>}
              <td className="text-center">Registerd credits</td>
              <td className="text-center">Passed credits</td>
              <td className="text-center">Completion rate</td>
              <td className="text-center">Average</td>
              <td className="text-center">Weighted Average</td>
              <td className="text-center">Credit Index</td>
              <td className="text-center">Corrected Credit Index</td>
            </tr>
          </thead>
          <tbody>
            {semesters.map(semester => {
              return (
                <tr key={semester.id} className="hover">
                  {UID && !SID && (
                    <th className="text-center">
                      <Link to={`/semesters/${universityID}/${semester.id}`}>{semester.name}</Link>
                    </th>
                  )}
                  <td className="text-center">{semester.registeredCredit}</td>
                  <td className="text-center">{semester.passedCredit}</td>
                  <td className="text-center">{round(semester.completionRate, 2)} %</td>
                  <td className="text-center">{round(semester.average, 2)}</td>
                  <td className="text-center">{round(semester.weightedAverage, 2)}</td>
                  <td className="text-center">{round(semester.creditIndex, 2)}</td>
                  <td className="text-center">{round(semester.correctedCreditIndex, 2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SemesterOverview;
