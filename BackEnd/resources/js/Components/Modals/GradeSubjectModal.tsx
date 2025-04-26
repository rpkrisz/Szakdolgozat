import {ChangeEvent, FC, useState} from "react";
// import {useToggle} from "react-use";
// import {Succes, Error} from "@/components/Feedbacks";
// import {SelectInput} from "@/components/Inputs";
// import {updateSubject} from "@/repositories/SubjectRepository";
// import {cancelModalForm, closeModal} from "@/lib";
import {Subject} from "@/types/Subject";
// import {updateSemesterAverages} from "@/repositories/SemesterRepository";

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

const GradeSubjectModal: FC<{subjectData: Subject}> = ({subjectData}) => {
  //   const [grade, setGrade] = useState({grade: subjectData.grade});
  //   const [succes, setSucces] = useToggle(false);
  //   const [error, setError] = useState("");

  //   const handelSelectNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //     const input = e.target;
  //     setGrade({grade: Number(input.value)});
  //   };

  //   const update = async () => {
  //     try {
  //       await updateSubject(subjectData!.id, {
  //         ...subjectData,
  //         isGraded: grade.grade ? true : false,
  //         grade: grade.grade,
  //       } as Subject);
  //     } catch (error) {
  //       setError("Subject grade saving faild!");
  //     }

  //     setGrade(grade);
  //     setSucces(true);
  //     closeModal("GradeSubjectModal");

  //     try {
  //       await updateSemesterAverages(subjectData.universityID, subjectData.semester);
  //     } catch (error) {
  //       setError("Subject grade saving faild!");
  //     }
  //   };

  return (
    <div>Modal</div>
    //     <dialog id="GradeSubjectModal" className="modal modal-bottom sm:modal-middle">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Grade Subject!</h3>
    //         <div className="flex flex-col">
    //           {succes && <Succes message="Grade saved!" closeFunction={() => setSucces(false)} />}
    //           {error && <Error message={error} closeFunction={() => setError("")} />}

    //           <SelectInput
    //             label="Grade"
    //             name="grade"
    //             options={grades}
    //             handelChange={handelSelectNumberChange}
    //             inputData={grade.grade}
    //             required={true}
    //           />
    //         </div>
    //         <div className="flex justify-end gap-2 p-2 modal-backdrop">
    //           <button className="btn" onClick={() => cancelModalForm(grade, setGrade, "GradeSubjectModal")}>
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

export default GradeSubjectModal;
