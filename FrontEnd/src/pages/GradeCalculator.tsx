import {FC, useEffect, useState} from "react";
import {Grading, Limits, TaskPoints} from "@/components/GradeCalculator";
import {useSetAtom} from "jotai/react";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import LoadSubject from "@/components/GradeCalculator/LoadSubject";

const GradeCalculator: FC = () => {
  const [maxPoint, setMaxPoint] = useState(0);
  const [isPercentage, setIsPercentage] = useState(false);
  const [SubjectName, setSubjectName] = useState("");

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

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    setTitle("Grade Calculator");
  });

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([{to: "/", name: "Home"}]);
  }, [setRoutes]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 max-h-fit">
        <LoadSubject
          setTasks={setTasks}
          setLimits={setLimits}
          setMaxPoint={setMaxPoint}
          setIsPercentage={setIsPercentage}
          setSubjectName={setSubjectName}
        />
        <div className="flex flex-col w-full lg:flex-row justify-stretch items-center lg:gap-20 gap-5 max-h-fit">
          <div className="flex flex-col w-full lg:flex-row gap-5 bg-secondary text-secondary-content rounded-md p-5">
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
          <Grading
            tasks={tasks}
            limits={limits}
            maxPoint={maxPoint}
            isPercentage={isPercentage}
            SubjectName={SubjectName}
          />
        </div>
      </div>
    </>
  );
};

export default GradeCalculator;
