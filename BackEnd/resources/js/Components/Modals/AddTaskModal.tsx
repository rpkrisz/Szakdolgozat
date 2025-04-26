import {ChangeEvent, FC, useEffect, useState} from "react";
// import {useAsync, useToggle} from "react-use";
// import {Succes, Error} from "@/components/Feedbacks";
// import {DateInput, NumberInput, SelectInput, TextInput} from "@/components/Inputs";
// import {createTask, updateTask} from "@/repositories/TaskRepository";
// import {getSubjects} from "@/repositories/SubjectRepository";
// import {getUniversitiesNames, getUniversityById} from "@/repositories/UniversityRepository";
// import {cancelModalForm, closeModal, handelModalFormChange, handelModelNumberChange, setSemestersSelector} from "@/lib";
import {Task} from "@/types/Task";
// import {entries} from "lodash";

// const initForm = {
//   name: "",
//   dueDate: "",
//   weight: 100,
//   type: "",
//   taskPage: "",
//   subjectID: "",
//   universityID: "",
// };

const AddTaskModal: FC<{subjectID?: string; semesterID?: number; universityID?: string; taskData?: Task}> = ({
  subjectID,
  semesterID,
  universityID,
  taskData,
}) => {
  //   const initialForm = taskData ?? {...initForm, subjectID: subjectID ?? "", universityID: universityID ?? ""};
  //   const [form, setForm] = useState({...initialForm});
  //   const [semester, setSemester] = useState(semesterID);
  //   const [semesters, setSemesters] = useState([{value: 1, text: "Semester 1"}]);
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");
  //   const [repetition, setRepetition] = useState(1);

  //   useEffect(() => {
  //     semesterID && setSemestersSelector(setSemesters, semesterID);
  //     if (universityID && !semesterID) {
  //       getUniversityById(universityID).then(res => {
  //         if (res?.semestersCount) {
  //           setSemestersSelector(setSemesters, res?.semestersCount);
  //         }
  //       });
  //     }
  //   }, [semesterID, universityID]);

  //   const handelSelectNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     const input = e.target;
  //     setSemester(Number(input.value));
  //   };

  //   const handelUniversityChange = async (e: ChangeEvent<HTMLSelectElement>) => {
  //     const input = e.target;
  //     setForm({...form, [input.name]: input.value});

  //     const result = await getUniversityById(input.value);
  //     const uniSems = result?.semestersCount ?? 0;
  //     setSemestersSelector(setSemesters, uniSems);
  //   };

  //   const sendForm = async () => {
  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["taskPage", "weight"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");

  //     const taskDraft = {...form};
  //     for (let index = 0; index < repetition; index++) {
  //       if (repetition > 1) {
  //         if (form.type === "midterm" || form.type === "assignment") {
  //           taskDraft.name = `${form.name} ${"I".repeat(index + 1)}`;
  //         } else {
  //           taskDraft.name = `${form.name} ${index + 1}`;
  //         }
  //       }

  //       try {
  //         await createTask(taskDraft);
  //       } catch (error) {
  //         setError("Task saving faild!");
  //       }
  //       const dueDate = new Date(Date.parse(taskDraft.dueDate));
  //       dueDate.setDate(dueDate.getDate() + 7);
  //       taskDraft.dueDate = dueDate.toISOString().slice(0, 10);
  //     }

  //     closeModal("addTaskModal");
  //     setForm({...initialForm});
  //     setRepetition(1);
  //     setSucces(true);
  //   };

  //   const update = async () => {
  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["taskPage"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");
  //     try {
  //       await updateTask(taskData!.id, form as Task);
  //     } catch (error) {
  //       setError("Task saving faild!");
  //     }
  //     setForm({...form});
  //     setSucces(true);
  //     closeModal("addTaskModal");
  //   };

  //   const subjectsState = useAsync(async () => {
  //     const subjects = (await getSubjects()).filter(subject => subject.universityID === form.universityID);
  //     if (semesterID) return subjects.filter(subject => subject.semester === semesterID);
  //     if (semester) return subjects.filter(subject => subject.semester === semester);
  //     return subjects;
  //   }, [semester, semesterID]);
  //   let subjectnames = [{value: "loading", text: "Loading"}];
  //   if (subjectsState.value) {
  //     subjectnames = subjectsState.value.map(pair => ({value: pair.id, text: pair.name}));
  //   }

  //   const universitiesState = useAsync(async () => {
  //     return await getUniversitiesNames();
  //   }, []);
  //   let universities = [{value: "loading", text: "Loading"}];
  //   if (universitiesState.value) {
  //     universities = universitiesState.value.map(pair => ({value: pair.id, text: pair.name}));
  //   }

  return (
    <div>Modal</div>
    //     <dialog id="addTaskModal" className="modal modal-bottom sm:modal-middle">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Add new Task!</h3>
    //         <div className="flex flex-col">
    //           {succes && <Succes message="University saved!" closeFunction={() => setSucces(false)} />}
    //           {error && <Error message={error} closeFunction={() => setError("")} />}
    //           <TextInput
    //             label="Name"
    //             name="name"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.name}
    //             required={true}
    //           />
    //           <DateInput
    //             label="Due date"
    //             name="dueDate"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.dueDate}
    //             required={true}
    //           />
    //           <SelectInput
    //             label="Type"
    //             name="type"
    //             options={[
    //               {value: "midterm", text: "Midterm"},
    //               {value: "quiz", text: "Quiz"},
    //               {value: "assignment", text: "Assignment"},
    //               {value: "exam", text: "Exam"},
    //               {value: "homeWork", text: "HomeWork"},
    //               {value: "bonusPoints", text: "Bonus Points"},
    //             ]}
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.type}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Weight"
    //             name="weight"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.weight}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Task page"
    //             name="taskPage"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.taskPage}
    //             required={true}
    //           />
    //           <SelectInput
    //             label="University"
    //             name="universityID"
    //             options={universities}
    //             handelChange={handelUniversityChange}
    //             inputData={form.universityID}
    //             required={true}
    //             disabled={!!universityID}
    //           />
    //           <SelectInput
    //             label="Semester"
    //             name="semester"
    //             options={semesters}
    //             handelChange={handelSelectNumberChange}
    //             inputData={semester!}
    //             required={true}
    //             disabled={!!semesterID || !!subjectID}
    //           />
    //           <SelectInput
    //             label="Subject"
    //             name="subjectID"
    //             options={subjectnames}
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.subjectID}
    //             required={true}
    //             disabled={!!subjectID}
    //           />
    //           <NumberInput
    //             label="Repetition"
    //             name="repetition"
    //             handelChange={e => {
    //               const newRep = Number(e.target.value);
    //               if (newRep < 1) return;
    //               setRepetition(newRep);
    //             }}
    //             inputData={repetition}
    //             required={true}
    //           />
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button className="btn" onClick={() => cancelModalForm(taskData ?? initialForm, setForm, "addTaskModal")}>
    //             Cancel
    //           </button>
    //           <button className="btn" onClick={taskData ? update : sendForm}>
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
  );
};

export default AddTaskModal;
