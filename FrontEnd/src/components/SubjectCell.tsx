import {Subject} from "@/types";
import {FC} from "react";
import {Link} from "react-router-dom";

const EditIcons: FC<{subject: Subject}> = ({subject}) => {
  const subjectName = subject.name;
  return (
    <th>
      <Link to={"/TaskManager/profile"}>{subjectName}</Link>
    </th>
  );
};

export default EditIcons;
