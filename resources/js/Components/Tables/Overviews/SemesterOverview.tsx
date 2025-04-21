import {FC} from "react";
import {Semester} from "@/types/Semester";
import {round} from "lodash";
import {Link, usePage} from "@inertiajs/react";

const SemesterOverview: FC<{
  semesters: Semester[];
  universityID?: string;
}> = ({semesters, universityID}) => {
  //   const {universityID: UID, semesterID: SID} = usePage();
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
              <td className="text-center">Grade Point Average</td>
              <td className="text-center">Credit Index</td>
              <td className="text-center">Corrected Credit Index</td>
            </tr>
          </thead>
          <tbody>
            {semesters.map(semester => {
              return (
                <tr key={semester.id} className="hover">
                  <th className="text-center">
                    <Link href={`/semesters/${universityID}/${semester.id}`}>{semester.name}</Link>
                  </th>
                  <td className="text-center">{semester.registeredCredit}</td>
                  <td className="text-center">{semester.passeedCredit}</td>
                  <td className="text-center">{round(semester.completionRate, 2)} %</td>
                  <td className="text-center">{semester.average}</td>
                  <td className="text-center">{semester.weightedAverage}</td>
                  <td className="text-center">{semester.creditIndex}</td>
                  <td className="text-center">{semester.correctedCreditIndex}</td>
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
