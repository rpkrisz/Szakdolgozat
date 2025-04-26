// import { SelectInput } from "@/Components/Inputs";
// import {ChangeEvent, FC, useEffect, useState} from "react";
// // import {useAsync} from "react-use";
// // import {SelectInput} from "@/components/Inputs";
// // import {getSubjectById, getSubjects} from "@/repositories/SubjectRepository";
// // import {getUniversitiesNames, getUniversityById} from "@/repositories/UniversityRepository";
// // import {handelModalFormChange, setSemestersSelector} from "@/lib";
// // import {Task} from "@/models/Task";
// // import {getTasks} from "@/repositories/TaskRepository";
// // import {Subject} from "@/models/Subject";
// // import {SubjectDetails} from "@/models/SubjectDetails";
// // import {getSubjectDetailsById} from "@/repositories/SubjectDetailsRepository";

// const initForm = {
//   subjectID: "",
//   universityID: "",
// };

// const LoadSubject: FC<{
//   subjectID?: string;
//   semesterID?: number;
//   universityID?: string;
//   setTasks: (tasks: {point: number; weight: number; name: string}[]) => void;
//   setLimits: (limits: {grade: number; limit: number}[]) => void;
//   setMaxPoint: (maxPoint: number) => void;
//   setIsPercentage: (percentage: boolean) => void;
// }> = ({subjectID, semesterID, universityID, setTasks, setLimits, setMaxPoint, setIsPercentage}) => {
//   const [form, setForm] = useState({...initForm});
//   const [semester, setSemester] = useState(semesterID);
//   const [semesters, setSemesters] = useState([{value: 1, text: "Semester 1"}]);

// //   useEffect(() => {
// //     semesterID && setSemestersSelector(setSemesters, semesterID);
// //     if (universityID && !semesterID) {
// //       getUniversityById(universityID).then(res => {
// //         if (res?.semestersCount) {
// //           setSemestersSelector(setSemesters, res?.semestersCount);
// //         }
// //       });
// //     }
// //   }, [semesterID, universityID]);

// //   const handelSelectNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
// //     const input = e.target;
// //     setSemester(Number(input.value));
// //   };

// //   const handelUniversityChange = async (e: ChangeEvent<HTMLSelectElement>) => {
// //     const input = e.target;
// //     setForm({...form, [input.name]: input.value});

// //     const result = await getUniversityById(input.value);
// //     const uniSems = result?.semestersCount ?? 0;
// //     setSemestersSelector(setSemesters, uniSems);
// //   };

// //   const subjectsState = useAsync(async () => {
// //     const subjects = (await getSubjects()).filter(subject => subject.universityID === form.universityID);
// //     if (semesterID) return subjects.filter(subject => subject.semester === semesterID);
// //     if (semester) return subjects.filter(subject => subject.semester === semester);
// //     return subjects;
// //   }, [semester, semesterID]);
// //   let subjectnames = [{value: "loading", text: "Loading"}];
// //   if (subjectsState.value) {
// //     subjectnames = subjectsState.value.map(pair => ({value: pair.id, text: pair.name}));
// //   }

// //   const universitiesState = useAsync(async () => {
// //     return await getUniversitiesNames();
// //   }, []);
// //   let universities = [{value: "loading", text: "Loading"}];
// //   if (universitiesState.value) {
// //     universities = universitiesState.value.map(pair => ({value: pair.id, text: pair.name}));
// //   }

// //   const cleare = () => {
// //     setForm({...initForm});
// //     setSemester(1);
// //     setSemesters([{value: 1, text: "Semester 1"}]);
// //   };

// //   const loadTasks = async () => {
// //     const subject: Subject | null = await getSubjectById(form.subjectID);
// //     if (!subject) return;
// //     const tasks: Task[] = await getTasks(subject.tasks);
// //     const details: SubjectDetails | null = await getSubjectDetailsById(subject.detailsID, subject.id);
// //     console.log(details);
// //     if (details) {
// //       setIsPercentage(details.isPercentage);
// //       setMaxPoint(details.maxPoint);

// //       setLimits([
// //         {grade: 2, limit: details.pointsFor2},
// //         {grade: 3, limit: details.pointsFor3},
// //         {grade: 4, limit: details.pointsFor4},
// //         {grade: 5, limit: details.pointsFor5},
// //       ]);
// //     }
// //     setTasks(
// //       tasks.map(task => {
// //         return {point: task.score, weight: task.weight, name: task.name};
// //       })
// //     );
// //   };

//   return (
//     <div className="flex flex-col justify-start text-white gap-1 bg-secondary rounded-md p-2">
//       <h3 className="font-bold text-lg">Load subject!</h3>
//       <div className="flex flex-row justify-around gap-1">
//         <SelectInput
//           label="University"
//           name="universityID"
//           options={universities}
//           handelChange={handelUniversityChange}
//           inputData={form.universityID}
//           required={true}
//           disabled={!!universityID}
//         />
//         <SelectInput
//           label="Semester"
//           name="semester"
//           options={semesters}
//           handelChange={handelSelectNumberChange}
//           inputData={semester!}
//           required={true}
//           disabled={!!semesterID || !!subjectID}
//         />
//         <SelectInput
//           label="Subject"
//           name="subjectID"
//           options={subjectnames}
//           handelChange={e => handelModalFormChange(e, form, setForm)}
//           inputData={form.subjectID}
//           required={true}
//           disabled={!!subjectID}
//         />
//       </div>
//       <div className="flex justify-end gap-5">
//         <button className="btn btn-primary" onClick={cleare}>
//           Cleare
//         </button>
//         <button className="btn btn-primary" onClick={loadTasks}>
//           Load
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoadSubject;
