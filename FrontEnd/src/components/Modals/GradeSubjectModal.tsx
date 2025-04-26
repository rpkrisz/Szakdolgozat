import {FC, useEffect, useState} from "react";
import {SelectInput} from "@/components/Inputs";
import {cancelModalForm, closeModal, handleSelectNumberChange} from "@/utils/";
import {Subject} from "@/types";
import {modalNames} from ".";
import {useUpdateSubject} from "@/services";
import {toast} from "react-toastify";

const grades = [
  {
    value: "0",
    text: "Not graded",
  },
  {
    value: "1",
    text: "1",
  },
  {
    value: "2",
    text: "2",
  },
  {
    value: "3",
    text: "3",
  },
  {
    value: "4",
    text: "4",
  },
  {
    value: "5",
    text: "5",
  },
];

const GradeSubjectModal: FC<{subjectData: Subject}> = ({subjectData}) => {
  const [grade, setGrade] = useState({grade: subjectData.grade});
  const [updateSubject] = useUpdateSubject();

  useEffect(() => {
    setGrade({grade: subjectData.grade});
  }, [subjectData]);

  const update = async () => {
    try {
      await updateSubject({
        ...subjectData,
        isGraded: grade.grade ? true : false,
        grade: grade.grade,
      } as Subject);
    } catch (error) {
      toast.error("Subject grade saving faild!");
    }

    toast.success(`${subjectData.name} had been graded!`);
    setGrade(grade);
    closeModal(modalNames.GradeSubjectModal);
  };

  return (
    <dialog id={modalNames.GradeSubjectModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Grade Subject!</h3>
        <div className="flex flex-col">
          <SelectInput
            label="Grade"
            name="grade"
            options={grades}
            handleChange={e => handleSelectNumberChange(e, grade, setGrade)}
            inputData={grade.grade}
            required={true}
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(grade, setGrade, modalNames.GradeSubjectModal)}
          >
            Cancel
          </button>
          <button className="btn btn-accent" onClick={update}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default GradeSubjectModal;
