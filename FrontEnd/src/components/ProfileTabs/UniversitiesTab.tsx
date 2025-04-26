import UniEdit from "./UniEdit";
import {useGetUniversities} from "@/services";

function UniversitiesTab() {
  const [universities] = useGetUniversities();

  return (
    <>
      {universities?.map(university => {
        return (
          <div key={university.id}>
            <h3>{university.name}</h3>
            <UniEdit universitiData={university}></UniEdit>
          </div>
        );
      })}
    </>
  );
}

export default UniversitiesTab;
