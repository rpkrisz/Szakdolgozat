import {getUniversities} from "@/repositories/UniversityRepository";
import {useAsync} from "react-use";
import UniEdit from "./UniEdit";

function UniversitiesTab() {
  const {value: universities} = useAsync(getUniversities);

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
