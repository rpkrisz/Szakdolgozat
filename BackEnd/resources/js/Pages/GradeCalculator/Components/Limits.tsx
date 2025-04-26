import { CheckBox, NumberInput } from "@/Components/Inputs";
import {ChangeEvent, FC} from "react";

const Limits: FC<{
  limits: {grade: number; limit: number}[];
  maxPoint: number;
  setLimits: (limits: {grade: number; limit: number}[]) => void;
  setMaxPoint: (maxPoint: number) => void;
  isPercentage: boolean;
  setIsPercentage: (percentage: boolean) => void;
}> = ({limits, maxPoint, setLimits, setMaxPoint, isPercentage, setIsPercentage}) => {
  const handelLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = e.target;
    const index = Number(input.name.slice(-1)) - 2;
    limits[index] = {...limits[index], limit: Number(input.value)};
    setLimits([...limits]);
  };

  return (
    <div className="flex flex-col justify-between gap-1 text-white">
      <h3 className="text-lg font-semibold">Grading</h3>
      <CheckBox
        label="Calculate with percentage"
        name="isPercentage"
        inputData={isPercentage}
        handelChange={e => setIsPercentage(e.target.checked)}
      />
      <NumberInput
        label="Maximum available points"
        name="maxPoint"
        inputData={maxPoint}
        handelChange={e => setMaxPoint(Number(e.target.value))}
      />
      {limits.map(({grade, limit}) => {
        return (
          <NumberInput
            key={grade}
            label={`${isPercentage ? "Percentage" : "Points"} for ${grade}`}
            placeholder="0"
            name={`PointsFor${grade}`}
            inputData={limit}
            handelChange={handelLimitChange}
          />
        );
      })}
    </div>
  );
};

export default Limits;
