import {FC} from "react";
import {AppraisalsTable, StatsTable} from "@/components/Tables";
import {useGetSemesterNames, useGetUniversitySubjects} from "@/services";

const UniversityAppraisals: FC<{universityID: number; universityStat?: boolean}> = ({universityID, universityStat}) => {
  const [universitySubjects] = useGetUniversitySubjects(universityID);
  const [semesterNames] = useGetSemesterNames();

  const statTitle = universityStat ? "University statistics" : "All semester statistics";
  const reverseSemesterNames = semesterNames.filter(semester => semester.universityID === universityID).reverse();

  return (
    <>
      <StatsTable subjects={universitySubjects} title={statTitle} titleLevel="primary" />
      <div className="flex flex-col gap-5">
        {reverseSemesterNames?.map(({id, name}) => {
          return <AppraisalsTable key={id} semesterID={id} title={name}></AppraisalsTable>;
        })}
      </div>
    </>
  );
};

export default UniversityAppraisals;
