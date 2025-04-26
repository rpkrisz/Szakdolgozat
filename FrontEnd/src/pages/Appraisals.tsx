import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {StatsTable} from "@/components/Tables";
import Collapsible from "@/components/Collapsible";
import UniversityAppraisals from "@/components/UniversityAppraisals";
import {useGetUniversitiesNames, useGetUniversity, useGetSubjects} from "@/services";

const Appraisals: FC = () => {
  const {universityID} = useParams();
  const [university] = useGetUniversity(universityID!);
  const [allSubject] = useGetSubjects();
  const [universities] = useGetUniversitiesNames();

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!university || !university.name) {
      setTitle("Appraisals");
      return;
    }
    setTitle(university.name + " Appraisals");
  }, [university, setTitle]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    if (!universityID) {
      setRoutes([{to: "/home", name: "Home"}]);
      return;
    }

    setRoutes([
      {to: "/home", name: "Home"},
      {to: `/universities/${universityID}`, name: "University"},
    ]);
  }, [setRoutes, universityID]);

  if (universityID) {
    return <UniversityAppraisals universityID={Number(universityID)} />;
  }

  return (
    <>
      <StatsTable subjects={allSubject} title="All semesters statistics" titleLevel="primary" />
      <div className="flex flex-col gap-5">
        {universities.map(({name, id}) => {
          return (
            <Collapsible key={id}>
              <h2 className="font-bold text-lg text-center bg-accent text-accent-content p-3">{name}</h2>
              <UniversityAppraisals universityID={id} universityStat />
            </Collapsible>
          );
        })}
      </div>
    </>
  );
};

export default Appraisals;
