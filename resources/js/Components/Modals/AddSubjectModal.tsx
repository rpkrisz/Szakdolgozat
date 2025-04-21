import {ChangeEvent, FC, useEffect, useState} from "react";
// import {useAsync, useToggle} from "react-use";
// import {Succes, Error} from "@/components/Feedbacks";
// import {TextInput, NumberInput, SelectInput, TextArea} from "@/components/Inputs";
// import {createSubject, updateSubject} from "@/repositories/SubjectRepository";
// import {getUniversitiesNames, getUniversityById} from "@/repositories/UniversityRepository";
// import {cancelModalForm, closeModal, handelModalFormChange, handelModelNumberChange, setSemestersSelector} from "@/lib";
import {Subject} from "@/types/Subject";
// import {entries} from "lodash";

// const initForm = {
//   name: "",
//   courseType: "",
//   credit: 0,
//   semester: 0,
//   notes: "",
//   universityID: "",
//   grade: 0,
//   isGraded: false,
// };

// const grades = [
//   {
//     value: "0",
//     text: "Not graded",
//   },
//   {
//     value: "1",
//     text: "1",
//   },
//   {
//     value: "2",
//     text: "2",
//   },
//   {
//     value: "3",
//     text: "3",
//   },
//   {
//     value: "4",
//     text: "4",
//   },
//   {
//     value: "5",
//     text: "5",
//   },
// ];

// const courseTypes = [
//   {
//     value: "Lecture",
//     text: "Lecture",
//   },
//   {
//     value: "Practice",
//     text: "Practice",
//   },
//   {
//     value: "Lecture & Practice",
//     text: "Lecture & Practice",
//   },
// ];

const AddSubjectModal: FC<{semesterID?: number; universityID?: string; subjectData?: Subject}> = ({
  semesterID,
  universityID,
  subjectData,
}) => {
  //   const initialForm = subjectData ?? {...initForm, semester: semesterID ?? 0, universityID: universityID ?? ""};
  //   const [form, setForm] = useState({...initialForm});
  //   const [semesters, setSemesters] = useState([{value: 1, text: "Semester 1"}]);
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     subjectData && setSemestersSelector(setSemesters, subjectData.semester);
  //     semesterID && setSemestersSelector(setSemesters, semesterID);
  //     if (universityID && !semesterID) {
  //       getUniversityById(universityID).then(res => {
  //         if (res?.semestersCount) {
  //           setSemestersSelector(setSemesters, res?.semestersCount);
  //         }
  //       });
  //     }
  //   }, [semesterID, universityID, subjectData]);

  //   const handelSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     const input = e.target;
  //     setForm({...form, [input.name]: input.value});
  //   };

  //   const handelSelectNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     const input = e.target;
  //     setForm({...form, [input.name]: Number(input.value)});
  //   };

  //   const handelTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //     const input = e.target;
  //     setForm({...form, [input.name]: input.value});
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
  //         if (["isGraded", "grade", "notes"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");

  //     try {
  //       await createSubject({...form, isGraded: (form.grade > 0)});
  //     } catch (error) {
  //       setError("Subject saving faild!");
  //     }
  //     setForm({...initialForm});
  //     setSucces(true);
  //     closeModal("addSubjectModal");
  //   };

  //   const update = async () => {
  //     if (
  //       entries(form).some(([key, value]) => {
  //         if (["isGraded", "grade", "notes", "detailsID"].includes(key)) return false;
  //         return !value;
  //       })
  //     )
  //       return setError("Some fields are missing!");
  //     try {
  //       await updateSubject(subjectData!.id, form as Subject);
  //     } catch (error) {
  //       setError("Subject saving faild!");
  //     }
  //     setForm({...form});
  //     setSucces(true);
  //     closeModal("addSubjectModal");
  //   };

  //   const universitiesState = useAsync(async () => {
  //     return await getUniversitiesNames();
  //   }, []);
  //   let universities = [{value: "loading", text: "Loading"}];
  //   if (universitiesState.value) {
  //     universities = universitiesState.value.map(pair => ({value: pair.id, text: pair.name}));
  //   }

  return (
    <div>Modal</div>
    //     <dialog id="addSubjectModal" className="modal modal-bottom sm:modal-middle">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Add new Subject!</h3>
    //         <div className="flex flex-col">
    //           {succes && <Succes message="Subject saved!" closeFunction={() => setSucces(false)} />}
    //           {error && <Error message={error} closeFunction={() => setError("")} />}
    //           <TextInput
    //             label="Subject name"
    //             name="name"
    //             handelChange={e => handelModalFormChange(e, form, setForm)}
    //             inputData={form.name}
    //             required={true}
    //           />
    //           <SelectInput
    //             label="Course type"
    //             name="courseType"
    //             options={courseTypes}
    //             handelChange={handelSelectChange}
    //             inputData={form.courseType}
    //             required={true}
    //           />
    //           <NumberInput
    //             label="Credit"
    //             name="credit"
    //             handelChange={e => handelModelNumberChange(e, form, setForm)}
    //             inputData={form.credit}
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
    //             inputData={form.semester}
    //             required={true}
    //             disabled={!!semesterID}
    //           />
    //           <SelectInput
    //             label="Grade"
    //             name="grade"
    //             options={grades}
    //             handelChange={handelSelectNumberChange}
    //             inputData={form.grade}
    //             required={true}
    //           />
    //           <TextArea
    //             label="Notes"
    //             name="notes"
    //             handelChange={handelTextAreaChange}
    //             inputData={form.notes}
    //             required={true}
    //           />
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button
    //             className="btn"
    //             onClick={() => cancelModalForm(subjectData ?? initialForm, setForm, "addSubjectModal")}
    //           >
    //             Cancel
    //           </button>
    //           <button className="btn" onClick={subjectData ? update : sendForm}>
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </dialog>
  );
};

export default AddSubjectModal;
