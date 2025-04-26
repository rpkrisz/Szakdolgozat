import {FC} from "react";
import {openModal} from "@/utils/";
import {University} from "@/types";
import {EditUniversityModal, modalNames} from "@/components/Modals";
import {useNavigate} from "react-router-dom";
import {BriefcaseBusiness, CalendarDays, CalendarPlus, Edit, GraduationCapIcon, Landmark, Trash2} from "lucide-react";
import {useDeleteUniversity} from "@/services";
import navigateTo from "@/NavigationRoutes";
import ToolTip from "../ToolTip";
import CardElement from "./components/CardElement";
import CardBase from "./components/CardBase";

const UniversityCard: FC<{university: University}> = ({university}) => {
  const {id, name, nickName, currSemFstDay, degreeLevel, currSemester, faculty, major, semestersCount, specialisation} =
    university;
  const navigate = useNavigate();
  const [deleteUniversity] = useDeleteUniversity();

  return (
    <CardBase>
      <h2 className="card-title text-xl font-bold uppercase text-gray-900 mb-2">
        {name} ({nickName})
      </h2>
      <div className="grid lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4">
        <CardElement
          title="Faculty"
          text={faculty}
          icon={<Landmark className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
        <CardElement
          title="Major"
          text={major}
          icon={<BriefcaseBusiness className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
        <CardElement
          title="Degree Level"
          text={degreeLevel}
          icon={<GraduationCapIcon className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
        <CardElement
          title="Specialisation"
          text={specialisation}
          icon={<GraduationCapIcon className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
        <CardElement
          title="Semester"
          text={`${semestersCount} / ${currSemester}`}
          icon={<CalendarPlus className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
        <CardElement
          title="The semester start's on"
          text={new Date(currSemFstDay).toDateString()}
          icon={<CalendarDays className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1 text-primary" />}
        />
      </div>
      <>
        <ToolTip text="Edit university." color="tooltip-accent" orientation="tooltip-bottom">
          <button className="btn btn-outline btn-primary" onClick={() => openModal(modalNames.EditUniversityModal)}>
            <Edit />
          </button>
        </ToolTip>
        <EditUniversityModal universitiData={university} />
        <ToolTip text="Delete university." color="tooltip-error" orientation="tooltip-bottom">
          <button
            className="btn btn-error"
            onClick={() => {
              if (!window.confirm(`Are you sure, you want to delete ${university.name}?`)) return;
              deleteUniversity(id);
              navigate(navigateTo.homePage);
            }}
          >
            <Trash2 />
          </button>
        </ToolTip>
      </>
    </CardBase>
  );
};

export default UniversityCard;
