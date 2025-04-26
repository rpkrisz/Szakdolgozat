import {EditTaskModal, TaskViewModal} from "@/components/Modals";
import {FC, ReactNode} from "react";
import {Link, useParams} from "react-router-dom";

const TaskTableHeaders: FC<{
  title: string;
  headerTitle: string;
  headers: {id: number | string; name: string}[];

  children: ReactNode;
}> = ({title, headerTitle, headers, children}) => {
  const {subjectID, semesterID, universityID} = useParams();

  return (
    <>
      {universityID && !subjectID && !semesterID && (
        <h1 className="text-center bg-primary text-primary-content font-bold text-xl my-5">Semester {title}</h1>
      )}
      {!universityID && !subjectID && (
        <h1 className="text-center bg-primary text-primary-content font-bold text-xl my-5">{title}</h1>
      )}
      <div className="flex flex-row gap-2">
        {!subjectID && (
          <div className="flex flex-col justify-between">
            <p>{headerTitle}</p>
            {headers.map(({name, id}) => {
              return (
                <p key={id} className="text-start taskTdBase items-center">
                  {headerTitle === "Subjects" ? <Link to={`/subjects/${id}`}>{name}</Link> : name}
                </p>
              );
            })}
          </div>
        )}
        {children}
        <EditTaskModal />
        <TaskViewModal />
      </div>
    </>
  );
};

export default TaskTableHeaders;
