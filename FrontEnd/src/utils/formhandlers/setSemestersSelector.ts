import {SemesterNames} from "@/types";

export default function setSemestersSelector(
  setter: (
    parm: {
      value: number;
      text: string;
    }[]
  ) => void,
  uniSems: SemesterNames[] | undefined
) {
  if (!uniSems) setter([{value: 0, text: "Semester 1"}]);

  const newSemesters = [];
  for (const semester of uniSems!) {
    newSemesters.push({value: semester.id, text: semester.name});
  }
  setter(newSemesters);
}
