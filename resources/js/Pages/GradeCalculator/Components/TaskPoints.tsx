import NumberInput from "@/components/Inputs/NumberInput";
import {ChangeEvent, FC} from "react";

const TaskPoints: FC<{
  tasks: {point: number; weight: number; name: string}[];
  setTasks: (tasks: {point: number; weight: number; name: string}[]) => void;
}> = ({tasks, setTasks}) => {
  const handelTaskPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = e.target;
    if (Number(input.value) < 0) return;
    const index = Number(input.name.slice(-1)) - 1;
    tasks[index] = {...tasks[index], point: Number(input.value)};
    setTasks([...tasks]);
  };

  const handelTaskWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = e.target;
    if (Number(input.value) > 100 || Number(input.value) < 0) return;
    const index = Number(input.name.slice(-1)) - 1;
    tasks[index] = {...tasks[index], weight: Number(input.value)};
    setTasks([...tasks]);
  };

  const addTask = () => {
    tasks.push({point: 0, weight: 100, name: ""});
    setTasks([...tasks]);
  };
  const removeTask = () => {
    tasks.pop();
    setTasks([...tasks]);
  };
  return (
    <div className="flex flex-col justify-start gap-3 text-white">
      <div className="felx justify-between">
        <h3 className="text-lg font-semibold">Points</h3>
        <div className="flex justify-between">
          <button className="btn btn-square btn-primary" onClick={removeTask}>
            -
          </button>
          <button className="btn btn-square btn-primary" onClick={addTask}>
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <h2>Task point</h2>
        <h2>Task weight (%)</h2>
      </div>
      <div className="overflow-y-scroll max-h-96">
        {tasks.map(({point, weight, name}, index) => {
          return (
            <>
              {name && <p>{name}</p>}
              <div key={index} className="flex gap-2">
                <NumberInput
                  label={`Task ${index + 1} point`}
                  name={`TaskPoint${index + 1}`}
                  inputData={point}
                  handelChange={handelTaskPointChange}
                />
                <NumberInput
                  label={`Task ${index + 1} weight`}
                  name={`TaskWeight${index + 1}`}
                  inputData={weight}
                  handelChange={handelTaskWeightChange}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPoints;
