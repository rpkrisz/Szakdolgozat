import {FC, useEffect, useState} from "react";
import {DateInput, NumberInput, SelectInput, TextArea, TextInput} from "@/components/Inputs";
import {
  cancelModalForm,
  closeModal,
  handleModalFormChange,
  handleModelNumberChange,
  handleSelectNumberChange,
  handleTextAreaChange,
  setSelectorOptions,
} from "@/utils/";
import {TaskForm} from "@/types";
import {entries} from "lodash";
import {useGetSemesterNames, useGetUniversitiesNames, useGetSubjectNames, useCreateTask} from "@/services";
import {modalNames} from ".";
import {toast} from "react-toastify";

const initForm = {
  name: "",
  dueDate: "",
  weight: 100,
  type: "",
  taskPage: "",
  description: "",
  semesterID: 0,
  universityID: 0,
  subjectID: 0,
};

const taskTypes = [
  {value: "midterm", text: "Midterm"},
  {value: "quiz", text: "Quiz"},
  {value: "assignment", text: "Assignment"},
  {value: "exam", text: "Exam"},
  {value: "homework", text: "Homework"},
  {value: "bonus_points", text: "Bonus Points"},
];

const AddTaskModal: FC<{subjectID?: number; semesterID?: number; universityID?: number}> = ({
  subjectID,
  semesterID,
  universityID,
}) => {
  const initialForm = {
    ...initForm,
    universityID: universityID ?? 0,
    semesterID: semesterID ?? 0,
    subjectID: subjectID ?? 0,
  };
  const [form, setForm] = useState<TaskForm>({...initialForm});
  const [semesterOptions, setSemesters] = useState([{value: 0, text: "Semester 1"}]);
  const [subjectOptions, setSubjects] = useState([{value: 0, text: "Subject"}]);
  const [allSemesters] = useGetSemesterNames();
  const [allSubjects] = useGetSubjectNames();
  const [universitiesNames] = useGetUniversitiesNames();
  const [createTask] = useCreateTask();
  let universities = [{value: "0", text: "Loading"}];
  if (universitiesNames) {
    universities = universitiesNames.map(pair => ({value: String(pair.id), text: pair.name}));
  }

  useEffect(() => {
    const uniSemesters = allSemesters?.filter(semester => semester.universityID === form.universityID);
    let uniSubjects = allSubjects?.filter(subject => subject.universityID === form.universityID);
    setSelectorOptions(setSemesters, uniSemesters);
    setSelectorOptions(setSubjects, uniSubjects);
    uniSubjects = allSubjects?.filter(subject => subject.semesterID === form.semesterID);
    setSelectorOptions(setSubjects, uniSubjects);
  }, [universityID, semesterID, form, allSemesters, allSubjects, subjectID]);

  useEffect(() => {
    setForm({
      ...initForm,
      universityID: universityID ?? 0,
      semesterID: semesterID ?? 0,
      subjectID: subjectID ?? 0,
    });
  }, [universityID, semesterID, subjectID]);

  const sendForm = async () => {
    if (
      entries(form).some(([key, value]) => {
        if (["taskPage", "weight", "description"].includes(key)) return false;
        return !value;
      })
    )
      return toast.error("Some fields are missing!");

    try {
      createTask(form);
    } catch (error) {
      toast.error("Task saving faild!");
    }

    closeModal(modalNames.AddTaskModal);
    setForm({...initialForm});
  };

  return (
    <dialog id={modalNames.AddTaskModal} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add new Task!</h3>
        <div className="flex flex-col">
          <TextInput
            label="Name"
            name="name"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.name}
            required={true}
          />
          <DateInput
            label="Due date"
            name="dueDate"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.dueDate}
            required={true}
          />
          <SelectInput
            label="Type"
            name="type"
            options={taskTypes}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.type}
            required={true}
          />
          <NumberInput
            label="Weight"
            name="weight"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.weight}
            required={true}
          />
          <SelectInput
            label="University"
            name="universityID"
            options={universities}
            handleChange={e => handleSelectNumberChange(e, form, setForm)}
            inputData={form.universityID}
            required={true}
          />
          <SelectInput
            label="Semester"
            name="semesterID"
            options={semesterOptions}
            handleChange={e => handleSelectNumberChange(e, form, setForm)}
            inputData={form.semesterID}
            required={true}
          />
          <SelectInput
            label="Subject"
            name="subjectID"
            options={subjectOptions}
            handleChange={e => handleSelectNumberChange(e, form, setForm)}
            inputData={form.subjectID}
            required={true}
          />
          <TextInput
            label="Task page"
            name="taskPage"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.taskPage}
            required={true}
          />
          <TextArea
            label="Description"
            name="description"
            handleChange={e => handleTextAreaChange(e, form, setForm)}
            inputData={form.description}
            required={true}
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => cancelModalForm(initialForm, setForm, modalNames.AddTaskModal)}
          >
            Cancel
          </button>
          <button className="btn btn-accent" onClick={sendForm}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddTaskModal;
