function rowDecorator(isGraded: boolean, grade: number) {
  if (!isGraded) return "";
  if (grade > 3) return "done";
  if (grade > 1) return "relevant";
  return "faild";
}
export default rowDecorator;
