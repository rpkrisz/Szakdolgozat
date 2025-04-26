import {FC, useEffect} from "react";
import {openModal} from "@/utils/";
import {AddTaskModal, CreateSubjectModal, modalNames} from "@/components/Modals";
import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {Link, useParams} from "react-router-dom";
import {SemesterOverview} from "@/components/Tables/Overviews";
import {UniversityCard} from "@/components/DetailsCards";
import {useGetUniversity, useGetUniversitySemesters} from "@/services";
import navigateRoutes from "@/NavigationRoutes";

const University: FC = () => {
  const {universityID} = useParams();

  const [university] = useGetUniversity(universityID!);
  const [semesters] = useGetUniversitySemesters(universityID!);

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!university || !university.name) return;
    setTitle(university.name!);
  }, [university, setTitle]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([{to: navigateRoutes.heroPage, name: "Home"}]);
  }, [setRoutes]);

  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Link className="btn btn-primary" to="tasks">
            Tasks
          </Link>
          <Link className="btn btn-primary" to="appraisals">
            Appraisals
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => openModal(modalNames.AddTaskModal)}>
            Add new Task
          </button>
          <AddTaskModal universityID={Number(universityID)} />
          <button className="btn btn-accent" onClick={() => openModal(modalNames.CreateSubjectModal)}>
            Add new Subject
          </button>
          <CreateSubjectModal universityID={university.id} />
        </div>
      </div>
      <UniversityCard university={university} />
      <SemesterOverview semesters={semesters} universityID={universityID} />
    </>
  );
};

export default University;
