import {FC} from "react";
import {openModal} from "@/utils/";
import {Subject} from "@/types";
import {EditSubjectModal, GradeSubjectModal, modalNames} from "@/components/Modals";
import {useNavigate} from "react-router-dom";
import {useDeleteSubject, useGetSemester} from "@/services";
import ToolTip from "../ToolTip";
import GradeLimits from "./components/GradingLimits";
import {
  BadgeCent,
  BookMarked,
  Edit,
  Notebook,
  Trash2,
  BookOpenIcon,
  CalendarPlus,
  XCircleIcon,
  CodeXmlIcon,
  ExternalLinkIcon,
  MapPinIcon,
  CheckCircleIcon,
  BarChart3Icon,
} from "lucide-react";
import CardBase from "./components/CardBase";

const SubjectCard: FC<{subject: Subject}> = ({subject}) => {
  const navigate = useNavigate();
  const [deleteSubject] = useDeleteSubject();
  const [semester] = useGetSemester(subject.semesterID);

  return (
    <CardBase>
      <>
        <div className="flex-1">
          <h2 className="card-title text-xl font-bold uppercase text-gray-900 mb-2">{subject.name}</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <CalendarPlus className="w-4 h-4 mr-1 text-primary" />
              <span>{semester?.name}</span>
            </div>
            <div className="flex items-center">
              <BookOpenIcon className="w-4 h-4 mr-1 text-primary" />
              <span>{subject.courseType}</span>
            </div>

            <div className="flex items-center">
              <BadgeCent className="w-4 h-4 mr-1 text-primary" />
              <span>{subject.credit} Credits</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1 text-primary" />
              <span>{subject.coursePlacement}</span>
            </div>
          </div>
        </div>
        {subject.coursePage && (
          <a
            href={subject.coursePage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:text-accent"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-1 text-primary" />
            Course Page
          </a>
        )}
      </>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Column */}
        <div className="space-y-3 lg:col-start-1">
          <div className="flex flex-col justify-start gap-1">
            <h3 className="flex items-center mb-1 font-semibold">
              <CheckCircleIcon className="w-4 h-4 mr-1 text-primary" />
              Grade Requirements:
            </h3>
            <p className="text-sm">{subject.mark}</p>
            <p className="text-sm">{subject.markConditions}</p>
            <p className="text-sm">{subject.examType}</p>
          </div>
          <div className="col-start-2">
            <h3 className="flex items-center mb-1 font-semibold">
              <BarChart3Icon className="w-4 h-4 mr-1 text-primary" />
              Score Requirements
            </h3>
            <p className="text-sm">{subject.scores}</p>
            <p className="text-sm">{subject.bonusExercise}</p>
          </div>
        </div>
        {/* Middle Column */}
        <div className="space-y-3 lg:col-start-2">
          <div>
            <h3 className="flex items-center mb-1 font-semibold">
              <XCircleIcon className="w-4 h-4 mr-1 text-primary" />
              Absence Policy
            </h3>
            <p className="text-sm">Maximum {subject.absences} absences allowed.</p>
          </div>
          <div>
            <h3 className="flex items-center mb-1 font-semibold">
              <BookOpenIcon className="w-4 h-4 mr-1 text-primary" />
              Required Readings
            </h3>
            <p className="text-sm">{subject.readings}.</p>
          </div>
          <div>
            <h3 className="flex items-center mb-1 font-semibold">
              <CodeXmlIcon className="w-4 h-4 mr-1 text-primary" />
              Programming Language
            </h3>
            <p className="text-sm">{subject.programingLanguage}</p>
          </div>
          <div>
            <h3 className="flex items-center mb-1 font-semibold">
              <Notebook className="w-4 h-4 mr-1 text-primary" />
              Notes
            </h3>
            <p className="text-sm">{subject.notes}</p>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-3 lg:col-start-3">
          <h3 className="flex items-center mb-1 font-semibold">
            <BookMarked className="w-4 h-4 mr-1 text-primary" />
            Grade limits
          </h3>
          <GradeLimits subject={subject} />
        </div>
      </div>
      <>
        <ToolTip text="Grade subject." color="tooltip-accent" orientation="tooltip-top">
          <button className="btn btn-outline btn-primary" onClick={() => openModal(modalNames.GradeSubjectModal)}>
            <BookMarked />
          </button>
        </ToolTip>
        <GradeSubjectModal subjectData={subject}></GradeSubjectModal>
        <ToolTip text="Edit subject." color="tooltip-accent" orientation="tooltip-top">
          <button className="btn btn-outline btn-primary" onClick={() => openModal(modalNames.EditSubjectModal)}>
            <Edit />
          </button>
          <EditSubjectModal subjectData={subject} />
        </ToolTip>
        <ToolTip text="Delete subject." color="tooltip-error" orientation="tooltip-top">
          <button
            className="btn btn-error"
            onClick={() => {
              const {universityID, semesterID} = subject;
              if (!window.confirm(`Are you sure, you want to delete ${subject.name}?`)) return;
              deleteSubject(subject.id);
              navigate(`/semesters/${universityID}/${semesterID}`);
            }}
          >
            <Trash2 />
          </button>
        </ToolTip>
      </>
    </CardBase>
  );
};

export default SubjectCard;
