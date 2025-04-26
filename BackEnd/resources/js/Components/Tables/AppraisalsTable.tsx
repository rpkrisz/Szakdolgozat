import {Subject} from "@/models/Subject";
import {FC} from "react";
import StatsTable from "./StatsTable";
import Collapsible from "../Collapsible";
import GradeTable from "./GradeTable";

const AppraisalsTables: FC<{subjects: Subject[]; title: string}> = ({subjects, title}) => {
  subjects.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Collapsible>
      <StatsTable subjects={subjects} title={title} titleLevel="secondary" />
      <GradeTable subjects={subjects} ></GradeTable>
    </Collapsible>
  );
};
export default AppraisalsTables;
