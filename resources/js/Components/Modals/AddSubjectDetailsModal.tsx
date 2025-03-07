import {ChangeEvent, FC, useEffect, useState} from "react";
// import {CheckBox, NumberInput, TextInput} from "@/components/Inputs";
// import {createSubjectDetails, updateSubjectDetails} from "@/repositories/SubjectDetailsRepository";
// import {useToggle} from "react-use";
// import {Error, Succes} from "@/components/Feedbacks";
// import {cancelModalForm, closeModal, handelModalFormChange, handelModelNumberChange} from "@/lib";
import {SubjectDetails} from "@/types/SubjectDetails";
// import {entries} from "lodash";

// const initialForm = {
//   coursePlacement: "",
//   markConditions: "",
//   scores: "",
//   bonusExercise: "",
//   mark: "",
//   examType: "",
//   readings: "",
//   absences: 0,
//   programingLanguage: "",
//   coursePage: "",
//   weeklyTimeConsumption: 0,
//   pointsFor2: 0,
//   pointsFor3: 0,
//   pointsFor4: 0,
//   pointsFor5: 0,
//   maxPoint: 0,
//   isPercentage: false,
//   subjectID: "",
// };

const AddSubjectDetailsModal: FC<{subjectID: string; subjectDetailsData?: SubjectDetails}> = ({
  subjectID,
  subjectDetailsData,
}) => {
  //   const [form, setForm] = useState(subjectDetailsData ?? {...initialForm, subjectID});
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");

  //   const handelIsPercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const input = e.target;
  //     setForm({...form, [input.name]: input.checked});
  //   };

  //   useEffect(() => setForm(subjectDetailsData ?? {...initialForm, subjectID}), [subjectDetailsData, subjectID]);

  //   const sendForm = async () => {
  //     console.log(form);

  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["isPercentage", "programingLanguage", "absences", "weeklyTimeConsumption"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");
  //     try {
  //       await createSubjectDetails(form);
  //     } catch (error) {
  //       setError("Subject details saving faild!");
  //     }
  //     setForm(initialForm);
  //     setSucces(true);
  //     closeModal("addSubjectDetailsModal");
  //   };

  //   const update = async () => {
  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["isPercentage", "programingLanguage", "absences", "weeklyTimeConsumption"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");
  //     try {
  //       await updateSubjectDetails(subjectDetailsData!.id, form as SubjectDetails);
  //     } catch (error) {
  //       setError("Subject Details saving faild!");
  //     }
  //     setForm({...form});
  //     setSucces(true);
  //     closeModal("addSubjectDetailsModal");
  //   };

  return (
    <div>Modal</div>
    //     <dialog id="addSubjectDetailsModal" className="modal modal-bottom sm:modal-middle">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Add Subject details!</h3>
    //         <div className="flex flex-col">
    //           {succes && <Succes message="Subject details saved!" closeFunction={() => setSucces(false)} />}
    //           {error && <Error message={error} closeFunction={() => setError("")} />}
    //           <h2>General informations</h2>
    //           <TextInput
    //             label="Course placement"
    //             name="coursePlacement"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.coursePlacement}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Mark conditions"
    //             name="markConditions"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.markConditions}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Scores"
    //             name="scores"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.scores}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Bonus exercise"
    //             name="bonusExercise"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.bonusExercise}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Mark"
    //             name="mark"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.mark}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Exam type"
    //             name="examType"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.examType}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Readings"
    //             name="readings"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.readings}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Absences"
    //             name="absences"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.absences}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Programing language"
    //             name="programingLanguage"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.programingLanguage}
    //             required={true}
    //           />
    //           <TextInput
    //             label="Course page"
    //             name="coursePage"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.coursePage}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Weekly time consumption in minutes"
    //             name="weeklyTimeConsumption"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.weeklyTimeConsumption}
    //             required={true}
    //           />
    //           <div className="bg-primary bg-opacity-15 my-2 p-2">
    //             <h2>Grade limits</h2>
    //             <CheckBox
    //               label="Calculate with percentage"
    //               name="isPercentage"
    //               inputData={form.isPercentage}
    //               handelChange={handelIsPercentageChange}
    //             />
    //             <NumberInput
    //               label={`${form.isPercentage ? "Percentage" : "Points"} for 2`}
    //               name="pointsFor2"
    //               inputData={form.pointsFor2}
    //               handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             />
    //             <NumberInput
    //               label={`${form.isPercentage ? "Percentage" : "Points"} for 3`}
    //               name="pointsFor3"
    //               inputData={form.pointsFor3}
    //               handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             />
    //             <NumberInput
    //               label={`${form.isPercentage ? "Percentage" : "Points"} for 4`}
    //               name="pointsFor4"
    //               inputData={form.pointsFor4}
    //               handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             />
    //             <NumberInput
    //               label={`${form.isPercentage ? "Percentage" : "Points"} for 5`}
    //               name="pointsFor5"
    //               inputData={form.pointsFor5}
    //               handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             />
    //             <NumberInput
    //               label="Maximum available points"
    //               name="maxPoint"
    //               inputData={form.maxPoint}
    //               handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             />
    //           </div>
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button
    //             className="btn"
    //             onClick={() => cancelModalForm(subjectDetailsData ?? initialForm, setForm, "addSubjectDetailsModal")}
    //           >
    //             Cancel
    //           </button>
    //           <button className="btn" onClick={subjectDetailsData ? update : sendForm}>
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
  );
};

export default AddSubjectDetailsModal;
