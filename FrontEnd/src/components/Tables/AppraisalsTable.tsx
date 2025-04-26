import {FC} from "react";
import StatsTable from "./StatsTable";
import Collapsible from "../Collapsible";
import GradeTable from "./GradeTable";
import {useGetSemesterSubjects} from "@/services";

const AppraisalsTables: FC<{semesterID: number; title: string}> = ({semesterID, title}) => {
  const [subjects] = useGetSemesterSubjects(semesterID);
  subjects.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Collapsible>
      <StatsTable subjects={subjects} title={title} titleLevel="secondary" />
      <GradeTable subjects={subjects} baseGrade={0}></GradeTable>
    </Collapsible>
  );
};
export default AppraisalsTables;
