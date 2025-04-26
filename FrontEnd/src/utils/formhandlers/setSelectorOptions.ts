import {SemesterNames, SubjectNames} from "@/types";

export default function setSelectorOptions(
  setter: (
    parm: {
      value: number;
      text: string;
    }[]
  ) => void,
  optionsArray: SemesterNames[] | SubjectNames[] | undefined
) {
  const newOptions = [];
  for (const option of optionsArray!) {
    newOptions.push({value: option.id, text: option.name});
  }
  setter(newOptions);
}
