import {UniversityCard} from "@/Components/DetailsCards";
import {AddSubjectModal, AddTaskModal} from "@/Components/Modals";
import {SemesterOverview} from "@/Components/Tables/Overviews";
import {openModal} from "@/lib";
import {titleAtom} from "@/store/atoms";
import {University as UniType} from "@/types/University";
import {Link, usePage} from "@inertiajs/react";
import {useSetAtom} from "jotai/react";
import {FC, useEffect} from "react";

const University: FC<{university: UniType}> = ({university}) => {
  const universityID = university.id;

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!university || !university.name) return;
    setTitle(university.name!);
  }, [university, setTitle]);

  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Link className="btn btn-primary" href="tasks">
            Tasks
          </Link>
          <Link className="btn btn-primary" href="appraisals">
            Appraisals
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => openModal("addTaskModal")}>
            Add new Task
          </button>
          <AddTaskModal universityID={universityID} />
          <button className="btn btn-accent" onClick={() => openModal("addSubjectModal")}>
            Add new Subject
          </button>
          <AddSubjectModal universityID={universityID} />
        </div>
      </div>
      <UniversityCard university={university} />
      {/* <SemesterOverview semesters={semesters} universityID={university.id} /> */}
    </>
  );
};

export default University;
