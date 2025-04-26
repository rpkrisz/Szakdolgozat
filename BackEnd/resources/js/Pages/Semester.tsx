import openModal from "@/lib/openModal";
import {FC, useEffect, useState} from "react";
import {SemesterOverview, SubjectOverview} from "@/Components/Tables/Overviews";
import {AddSubjectModal, AddTaskModal} from "@/Components/Modals";
import {Subject} from "@/types/Subject";
import {Semester as SemesterType} from "@/types/Semester";
import {University} from "@/types/University";
import {Link} from "@inertiajs/react";

const Semester: FC<{semester: SemesterType; subjects: Subject[]}> = parms => {
  const {semester, subjects} = parms;
  console.log(semester, subjects);

  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Link className="btn btn-primary" href="tasks">
            Tasks
          </Link>
          <Link className="btn btn-primary" href="predictions">
            {subjects.every(subject => subject.isGraded) ? "Appraisal" : "Predictions"}
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => openModal("addTaskModal")}>
            Add new Task
          </button>
          <AddTaskModal universityID={semester.university_id} semesterID={Number(semester.id)} />
          <button className="btn btn-accent" onClick={() => openModal("addSubjectModal")}>
            Add new Subject
          </button>
          <AddSubjectModal universityID={semester.university_id} semesterID={Number(semester.id)} />
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <SemesterOverview semesters={[semester!]} />
        <SubjectOverview subjects={subjects} subjectNameOn={true}></SubjectOverview>
      </div>
    </>
  );
};

export default Semester;
