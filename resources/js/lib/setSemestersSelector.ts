export default function setSemestersSelector(
  setter: (
    parm: {
      value: number;
      text: string;
    }[]
  ) => void,
  uniSems: number
) {
  const newSemesters = [];
  for (let index = 0; index < uniSems; index++) {
    newSemesters.push({value: index + 1, text: `Semester ${index + 1}`});
  }
  setter(newSemesters);
}
