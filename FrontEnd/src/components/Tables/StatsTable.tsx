import {Subject} from "@/types";
import {getAVG, getCCI, getCI, getGPA, getPassedCredits, getRegisteredCredits} from "@/utils/SemesterAverageFunctions";
import {round} from "lodash";
import {FC} from "react";

const StatsTable: FC<{subjects: Subject[]; title: string; titleLevel: string}> = ({subjects, title, titleLevel}) => {
  const registeredCredit = getRegisteredCredits(subjects);
  const passedCredit = getPassedCredits(subjects);
  const completionRate = round((passedCredit / registeredCredit) * 100, 2);
  const stats = {
    registeredCredit: registeredCredit,
    passedCredit: passedCredit,
    completionRate: isNaN(completionRate) ? 0 : completionRate,
    average: getAVG(subjects),
    weightedAverage: getGPA(subjects),
    creditIndex: getCI(subjects),
    correctedCreditIndex: getCCI(subjects),
  };

  return (
    <>
      <div className="overflow-x-auto m-2 my-5">
        <h2 className={`font-bold text-lg text-center bg-${titleLevel} text-${titleLevel}-content p-3`}>{title}</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Registerd credits</th>
              <th className="text-center">Passed credits</th>
              <th className="text-center">Completion rate</th>
              <th></th>
              <th className="text-center">Average</th>
              <th className="text-center">Weighted Average</th>
              <th className="text-center">Credit Index</th>
              <th className="text-center">Corrected Credit Index</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th className="text-center">{stats.registeredCredit}</th>
              <th className="text-center">{stats.passedCredit}</th>
              <th className="text-center">{stats.completionRate}</th>
              <th className="text-center"></th>
              <th className="text-center">{stats.average}</th>
              <th className="text-center">{stats.weightedAverage}</th>
              <th className="text-center">{stats.creditIndex}</th>
              <th className="text-center">{stats.correctedCreditIndex}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default StatsTable;
