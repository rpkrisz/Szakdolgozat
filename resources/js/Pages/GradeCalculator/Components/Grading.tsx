import {round} from "lodash";
import {FC} from "react";

const Grading: FC<{
  tasks: {point: number; weight: number}[];
  limits: {grade: number; limit: number}[];
  maxPoint: number;
  isPercentage: boolean;
}> = ({tasks, limits, maxPoint, isPercentage}) => {
  const sumPoints = tasks
    .map(task => (task.point * task.weight) / 100)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const percentage = (sumPoints / maxPoint) * 100;
  const grade = isPercentage
    ? (limits.filter(limit => limit.limit <= percentage).pop()?.grade as number)
    : (limits.filter(limit => limit.limit <= sumPoints).pop()?.grade as number);

  return (
    <div className="flex flex-col flex-grow justify-center gap-4 text-center bg-secondary rounded-md p-10 text-2xl">
      <h3 className="text-lg font-semibold">Calculated grade: {grade} </h3>
      <p>Sum of points: {sumPoints}</p>
      <p>Percentage: {isNaN(percentage) ? 0 : percentage.toFixed(2)}%</p>
      <div>
        {limits.map(limit => {
          return (
            <p key={limit.grade}>
              Points neded for {limit.grade}:
              {limit.grade <= grade
                ? " Got it"
                : ` ${
                    isPercentage ? round(((limit.limit - percentage) * maxPoint) / 100, 2) : limit.limit - sumPoints
                  }`}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Grading;
