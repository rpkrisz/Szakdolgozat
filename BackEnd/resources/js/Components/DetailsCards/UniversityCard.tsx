import {FC} from "react";
import openModal from "@/lib/openModal";
import {University} from "@/types/University";
import {AddUniversityModal} from "@/Components/Modals";
// import {deleteUniversity} from "@/repositories/UniversityRepository";
import {Edit, Trash2} from "lucide-react";
import {useForm} from "@inertiajs/react";

const UniversityCard: FC<{university: University}> = ({university}) => {
  const {delete: destroy} = useForm();

  const {name, nickName, currSemFstDay, degreeLevel, currSemester, faculty, major, semestersCount, specialisation} =
    university;
  return (
    <>
      <div className="card lg:card-side bg-secondary m-5 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title">
            {name} ({nickName})
          </h2>
          <div className="flex zero:flex-col lg:flex-row  justify-start zero:gap-3 lg:gap-10">
            <div>
              <p>{faculty}</p>
              <p>{major}</p>
              <p>{specialisation}</p>
            </div>
            <div>
              <p>{degreeLevel}</p>
              <p>
                Semester {semestersCount} / {currSemester}
              </p>
              <p>The semester start's on {new Date(currSemFstDay).toDateString()}</p>
            </div>
          </div>
          <div className="card-actions zero:mt-3 lg:m-0 justify-center lg:justify-end">
            <button className="btn btn-outline btn-primary" onClick={() => openModal("addUniversityModal")}>
              <Edit />
            </button>
            <AddUniversityModal universitiData={university} />
            <button
              className="btn btn-error"
              onClick={() => {
                destroy(route("universities.destroy", {university: university}));
              }}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityCard;
