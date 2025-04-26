import {FC, useState} from "react";
// import {useAsync, useToggle} from "react-use";
// import {Succes, Error} from "@/components/Feedbacks";
// import {DateInput, NumberInput, SelectInput, TextInput} from "@/components/Inputs";
// import {getTaskById, updateTask} from "@/repositories/TaskRepository";
// import {getSubjectById} from "@/repositories/SubjectRepository";
// import {getUniversityById} from "@/repositories/UniversityRepository";
// import {cancelModalForm, closeModal, handelModalFormChange, handelModelNumberChange} from "@/lib";
// import {Task} from "@/models/Task";
// import {entries} from "lodash";
// import {useAtom} from "jotai/react";
// import {editTaskIDAtom, taskEditToggel} from "@/store/atoms";

// const initForm = {
//   name: "",
//   dueDate: "",
//   weight: 100,
//   type: "",
//   taskPage: "",
//   subjectID: "",
//   universityID: "",
//   state: "",
//   score: 0,
// };

const EditTaskModal: FC = () => {
  //   const [taskID, setTaskID] = useAtom(editTaskIDAtom);
  //   const [form, setForm] = useState({...initForm});
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");
  //   const [toggel, setToggel] = useAtom(taskEditToggel);
  //   const {
  //     value,
  //     error: loadError,
  //     loading,
  //   } = useAsync(async () => {
  //     if (!taskID) return {subjectName: "", universityName: ""};

  //     const task = await getTaskById(taskID);
  //     if (!task) return {subjectName: "", universityName: ""};

  //     const subject = await getSubjectById(task.subjectID);
  //     const university = await getUniversityById(task.universityID);
  //     setForm({...task});

  //     return {subjectName: subject?.name, universityName: university?.name};
  //   }, [taskID]);

  //   const update = async () => {
  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["taskPage", "score", "weight"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");
  //     try {
  //       await updateTask(taskID!, form as Task);
  //     } catch (error) {
  //       setError("Task update faild!");
  //     }
  //     setForm({...form});
  //     setSucces(true);
  //     setTaskID(undefined);
  //     closeModal("EditTaskModal");
  //     setToggel(!toggel);
  //   };

  //   if (loading) return;
  //   if (loadError) {
  //     console.error(loadError.message);
  //     return <p>Error Task Edit</p>;
  //   }

  //   const {subjectName, universityName} = value!;

  return (
    <div>Modal</div>
    //     <dialog id="EditTaskModal" className="modal modal-bottom sm:modal-middle" open={!!taskID}>
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Edit Task!</h3>
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
    //             label="Score"
    //             name="score"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.score}
    //             required={true}
    //           />
    //           <SelectInput
    //             label="Task state"
    //             name="state"
    //             options={[
    //               {value: "inprogress", text: "In work"},
    //               {value: "done", text: "Done"},
    //               {value: "graded", text: "Graded"},
    //               {value: "faild", text: "Faild"},
    //             ]}
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.state}
    //             required={true}
    //           />
    //           <TextInput
    //             label="University"
    //             name="universityID"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={universityName!}
    //             required={true}
    //             disabled={true}
    //           />
    //           <TextInput
    //             label="Subject"
    //             name="subjectID"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={subjectName!}
    //             required={true}
    //             disabled={true}
    //           />
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button
    //             className="btn"
    //             onClick={() => {
    //               setTaskID(undefined);
    //               cancelModalForm(form, setForm, "EditTaskModal");
    //             }}
    //           >
    //             Cancel
    //           </button>
    //           <button className="btn" onClick={update}>
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
  );
};

export default EditTaskModal;
