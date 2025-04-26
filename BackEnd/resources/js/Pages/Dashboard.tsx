import {Loading} from "@/Components/Feedbacks";
import {AddSubjectDetailsModal, AddSubjectModal, AddTaskModal, AddUniversityModal} from "@/Components/Modals";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {openModal} from "@/lib";
import {titleAtom} from "@/store/atoms";
import {University} from "@/types/University";
import {Head, Link} from "@inertiajs/react";
import {useSetAtom} from "jotai/react";

export default function Dashboard(prop) {
  const setTitle = useSetAtom(titleAtom);
  setTitle("Dashboard");
  const universities: University[] = prop.universities;
  console.log(universities);
  return (
    <>
      <div className="flex gap-2 justify-around">
        <button className="btn " onClick={() => openModal("addUniversityModal")}>
          Add new University
        </button>
        <AddUniversityModal />
        <button className="btn " onClick={() => openModal("addTaskModal")}>
          Add new Task
        </button>
        <AddTaskModal />
        <button className="btn " onClick={() => openModal("addSubjectModal")}>
          Add new Subject
        </button>
        <AddSubjectModal />
        <button className="btn " onClick={() => openModal("addSubjectDetailsModal")}>
          Add new SubjectDetails
        </button>
        <AddSubjectDetailsModal subjectID="" />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>University</th>
            <th>Faculty</th>
            <th>Current Semester</th>
            <th>Semesters</th>
          </tr>
        </thead>
        <tbody>
          {universities?.map(uni => {
            return (
              <tr key={uni.id}>
                <td>
                  <Link href={`universities/${uni.id}`}>{uni.name}</Link>
                </td>
                <td> {uni.faculty}</td>
                <td>
                  <Link href={`semesters/${uni.id}/${uni.currSemester}`}> {uni.currSemester}</Link>
                </td>
                <td>{uni.semestersCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
