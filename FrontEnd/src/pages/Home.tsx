import {Loading} from "@/components/Feedbacks";
import {CreateSubjectModal, AddTaskModal, AddUniversityModal, modalNames} from "@/components/Modals";
import UrgentTasks from "@/components/Tables/TaskTable/UrgentTasks";
import {useGetUniversities} from "@/services";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {FC, useEffect} from "react";
import {Link} from "react-router-dom";

const Home: FC = () => {
  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName) as HTMLDialogElement;
    if (!modal) return;
    modal.showModal();
  };

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    setTitle("Home");
  });

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([{to: "/", name: "Home"}]);
  }, [setRoutes]);

  const [universities, {isLoading: loading, error: uniError}] = useGetUniversities();

  return (
    <>
      <div className="flex gap-2 justify-around">
        <button
          className={`btn btn-accent ${universities.length === 0 ? "" : "btn-outline"}`}
          onClick={() => openModal(modalNames.AddUniversityModal)}
        >
          Add new University
        </button>
        <AddUniversityModal />
        <button
          className={`btn btn-accent ${universities.length === 0 ? "btn-outline" : ""}`}
          onClick={() => openModal(modalNames.AddTaskModal)}
        >
          Add new Task
        </button>
        <AddTaskModal />
        <button
          className={`btn btn-accent ${universities.length === 0 ? "btn-outline" : ""}`}
          onClick={() => openModal(modalNames.CreateSubjectModal)}
        >
          Add new Subject
        </button>
        <CreateSubjectModal />
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
          {loading ? (
            <Loading />
          ) : uniError ? (
            <p>Error</p>
          ) : (
            universities?.map(uni => {
              return (
                <tr key={uni.id}>
                  <td>
                    <Link to={`/universities/${uni.id}`}>{uni.name}</Link>
                  </td>
                  <td> {uni.faculty}</td>
                  <td>
                    <Link to={`/semesters/${uni.id}/${uni.currSemesterID}`}> {uni.currSemester}</Link>
                  </td>
                  <td>{uni.semestersCount}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <UrgentTasks />
    </>
  );
};

export default Home;
