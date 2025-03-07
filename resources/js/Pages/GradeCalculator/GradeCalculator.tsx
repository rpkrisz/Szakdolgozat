import {FC, useEffect, useState} from "react";
import {TaskPoints, Grading, Limits} from "./Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

const GradeCalculator: FC = () => {
  const [tasks, setTasks] = useState([
    {name: "", point: 0, weight: 100},
    {name: "", point: 0, weight: 100},
    {name: "", point: 0, weight: 100},
  ]);
  const [limits, setLimits] = useState([
    {grade: 2, limit: 0},
    {grade: 3, limit: 0},
    {grade: 4, limit: 0},
    {grade: 5, limit: 0},
  ]);
  const [maxPoint, setMaxPoint] = useState(0);
  const [isPercentage, setIsPercentage] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-5 max-h-fit">
      {/* <LoadSubject
          setTasks={setTasks}
          setLimits={setLimits}
          setMaxPoint={setMaxPoint}
          setIsPercentage={setIsPercentage}
        /> */}
      Loading...
      <div className="flex justify-stretch items-center gap-20 max-h-fit">
        <div className="flex flex-row gap-5 bg-secondary text-secondary-content rounded-md p-5">
          <TaskPoints tasks={tasks} setTasks={setTasks} />
          <Limits
            limits={limits}
            setLimits={setLimits}
            maxPoint={maxPoint}
            setMaxPoint={setMaxPoint}
            isPercentage={isPercentage}
            setIsPercentage={setIsPercentage}
          ></Limits>
        </div>
        <Grading tasks={tasks} limits={limits} maxPoint={maxPoint} isPercentage={isPercentage} />
      </div>
      <Head title="Grade Calculator"></Head>
    </div>
  );
};

export default GradeCalculator;
