import {FC, useEffect, useState} from "react";
import {SelectInput} from "@/components/Inputs";
import {handleSelectNumberChange, setSelectorOptions} from "@/utils/";
import {Task, Subject} from "@/types";
import {useGetSemesterNames, useGetSubjects, useGetUniversitiesNames, useGetTasks} from "@/services";

const initForm = {
  subjectID: 0,
  semesterID: 0,
  universityID: 0,
};

const LoadSubject: FC<{
  subjectID?: number;
  semesterID?: number;
  universityID?: number;
  setTasks: (tasks: {point: number; weight: number; name: string}[]) => void;
  setLimits: (limits: {grade: number; limit: number}[]) => void;
  setMaxPoint: (maxPoint: number) => void;
  setIsPercentage: (percentage: boolean) => void;
  setSubjectName: (name: string) => void;
}> = ({subjectID, semesterID, universityID, setTasks, setLimits, setMaxPoint, setIsPercentage, setSubjectName}) => {
  const [form, setForm] = useState({...initForm});
  const [semesterOptions, setSemesters] = useState([{value: 0, text: "Semester 1"}]);
  const [subjectOptions, setSubjects] = useState([{value: 0, text: "Subject"}]);
  const [allSemesters] = useGetSemesterNames();
  const [allSubjects] = useGetSubjects();
  const [[, allTasks]] = useGetTasks();
  const [universitiesNames] = useGetUniversitiesNames();
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
      universityID: universityID ?? 0,
      semesterID: semesterID ?? 0,
      subjectID: subjectID ?? 0,
    });
  }, [universityID, semesterID, subjectID]);

  const cleare = () => {
    setForm({...initForm});
    setSubjectName("");
    setSemesters([{value: 1, text: "Semester 1"}]);
    setTasks([{point: 0, weight: 100, name: ""}]);
  };

  const loadTasks = async () => {
    const subject: Subject | undefined = allSubjects.find(subject => subject.id === form.subjectID);
    if (!subject) return;
    const tasks: Task[] = allTasks.filter(task => task.subjectID === subject.id);
    setIsPercentage(subject.isPercentage);
    setMaxPoint(subject.maxScore);
    setSubjectName(subject.name);

    setLimits([
      {grade: 2, limit: subject.pointsFor2},
      {grade: 3, limit: subject.pointsFor3},
      {grade: 4, limit: subject.pointsFor4},
      {grade: 5, limit: subject.pointsFor5},
    ]);

    setTasks(
      tasks.map(task => {
        return {point: task.score, weight: task.weight, name: task.name};
      })
    );
  };

  return (
    <div className="flex flex-col justify-start text-white gap-1 bg-secondary text-secondary-content rounded-md p-2 lg:col-span-2">
      <h3 className="font-bold text-lg">Load subject!</h3>
      <div className="flex flex-col xl:flex-row justify-around gap-1">
        <SelectInput
          label="University"
          name="universityID"
          options={universities}
          handleChange={e => handleSelectNumberChange(e, form, setForm)}
          inputData={form.universityID}
          required={true}
          disabled={!!universityID}
        />
        <SelectInput
          label="Semester"
          name="semesterID"
          options={semesterOptions}
          handleChange={e => handleSelectNumberChange(e, form, setForm)}
          inputData={form.semesterID}
          required={true}
          disabled={!!semesterID || !!subjectID}
        />
        <SelectInput
          label="Subject"
          name="subjectID"
          options={subjectOptions}
          handleChange={e => handleSelectNumberChange(e, form, setForm)}
          inputData={form.subjectID}
          required={true}
          disabled={!!subjectID}
        />
      </div>
      <div className="flex justify-end gap-5">
        <button className="btn btn-primary" onClick={cleare}>
          Cleare
        </button>
        <button className="btn btn-primary" onClick={loadTasks}>
          Load
        </button>
      </div>
    </div>
  );
};

export default LoadSubject;
