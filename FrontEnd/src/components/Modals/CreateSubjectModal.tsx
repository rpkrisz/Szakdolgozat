import {FC, useEffect, useState} from "react";
import {closeModal, setSelectorOptions} from "@/utils/";
import {SubjectForm as SubjectFormType} from "@/types";
import SubjectForm from "./componets/SubjectForm";
import SubjectDetailsForm from "./componets/SubjectDetailsForm";
import SubjectGradingForm from "./componets/SubjectGradingForm";
import {modalNames} from ".";
import {useCreateSubject, useGetSemesterNames} from "@/services";
import {entries} from "lodash";
import {toast} from "react-toastify";

const initForm = {
  name: "",
  courseType: "",
  credit: 0,
  notes: "",
  grade: 0,
  isGraded: false,
  coursePlacement: "",
  markConditions: "",
  scores: "",
  bonusExercise: "",
  mark: "",
  examType: "",
  readings: "",
  absences: 0,
  programingLanguage: "",
  coursePage: "",
  weeklyTimeConsumption: 0,
  pointsFor2: 0,
  pointsFor3: 0,
  pointsFor4: 0,
  pointsFor5: 0,
  maxScore: 0,
  isPercentage: false,
  semesterID: 0,
  universityID: 0,
};

const CreateSubjectModal: FC<{semesterID?: number; universityID?: number}> = ({semesterID, universityID}) => {
  const initialForm = {...initForm, semesterID: semesterID ?? 0, universityID: universityID ?? 0};
  const [form, setForm] = useState<SubjectFormType>(initialForm);
  const [stepIndex, setStep] = useState(0);
  const [createSubjectAPI, qurey] = useCreateSubject();
  const [semesters, setSemesters] = useState([{value: 1, text: "Semester 1"}]);
  const [allSemesters] = useGetSemesterNames();

  useEffect(() => {
    const uniSemesters = allSemesters?.filter(semester => semester.universityID === form.universityID);
    setSelectorOptions(setSemesters, uniSemesters);
  }, [universityID, semesterID, form, allSemesters]);

  useEffect(() => {
    setForm({
      ...initForm,
      universityID: universityID ?? 0,
      semesterID: semesterID ?? 0,
    });
  }, [universityID, semesterID]);

  const sendForm = async () => {
    if (
      entries(form).some(([key, value]) => {
        if (["courseType", "name", "semesterID", "universityID", "credit"].includes(key)) return !value;
        return false;
      })
    )
      return toast.error("Some fields are missing! General data is required!");

    try {
      const formdata = {...form, isGraded: form.grade > 0};
      createSubjectAPI(formdata);
    } catch (error) {
      console.error("Subject saving faild!", error);
    }

    if (qurey.isError) {
      return console.error(qurey.error);
    }

    cancelCreate();
  };

  const cancelCreate = () => {
    setStep(0);
    setForm({...initialForm});
    closeModal(modalNames.CreateSubjectModal);
  };

  const next = () => {
    const nextStep = stepIndex == 2 ? 2 : stepIndex + 1;
    setStep(nextStep);
  };

  const back = () => {
    const nextStep = stepIndex == 0 ? 0 : stepIndex - 1;
    setStep(nextStep);
  };

  return (
    <dialog id={modalNames.CreateSubjectModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add new Subject!</h3>
        <div className="flex justify-center">
          <ul className="steps">
            <li className={`step ${stepIndex >= 0 ? "step-primary" : ""}`}>General</li>
            <li className={`step ${stepIndex >= 1 ? "step-primary" : ""}`}>Details</li>
            <li className={`step ${stepIndex >= 2 ? "step-primary" : ""}`}>Grading</li>
          </ul>
        </div>
        {stepIndex === 0 && <SubjectForm semesters={semesters} formData={form} setFormData={setForm} />}
        {stepIndex === 1 && <SubjectDetailsForm formData={form} setFormData={setForm} />}
        {stepIndex === 2 && <SubjectGradingForm formData={form} setFormData={setForm} />}
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button className="btn btn-secondary" onClick={cancelCreate}>
            Cancel
          </button>
          {stepIndex > 0 && (
            <button className="btn btn-secondary" onClick={back}>
              Back
            </button>
          )}
          {stepIndex === 2 ? (
            <button className="btn btn-accent" onClick={sendForm}>
              Create
            </button>
          ) : (
            <button className="btn btn-accent" onClick={next}>
              Next
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default CreateSubjectModal;
