import {Semester, Subject} from "@/types";
import {round} from "lodash";

const sumOfWeightedCredits = (subjects: Subject[]) => {
  return subjects.reduce((acc, subject) => acc + subject.credit * subject.grade, 0);
};

const getPassedSubjects = (subjects: Subject[]) => {
  return subjects.filter(subject => subject.grade > 1);
};

const getRegisteredCredits = (semesterSubjects: Subject[]) => {
  return semesterSubjects.reduce((acc, subject) => acc + subject.credit, 0);
};

const getPassedCredits = (semesterSubjects: Subject[]) => {
  const passedSubjects = getPassedSubjects(semesterSubjects);
  return passedSubjects.reduce((acc, subject) => acc + subject.credit, 0);
};

const getCompletionRate = (semester: Semester) => {
  if (semester.passedCredit === 0 || semester.registeredCredit === 0) return 0;
  return (semester.passedCredit / semester.registeredCredit) * 100;
};

const average = (semesterSubjects: Subject[], numOfSemesterSubjects: number) => {
  if (numOfSemesterSubjects === 0) return 0;
  return semesterSubjects.reduce((acc, subject) => acc + subject.grade, 0) / numOfSemesterSubjects;
};

const getAVG = (semesterSubjects: Subject[]) => {
  const filteredSubjects = getPassedSubjects(semesterSubjects);
  const numOfSemesterSubjects = filteredSubjects.length;
  return round(average(filteredSubjects, numOfSemesterSubjects), 2);
};

const getGPA = (semesterSubjects: Subject[]) => {
  const registeredCredits = getRegisteredCredits(semesterSubjects);
  const sumOfPassedWeightedCredits = sumOfWeightedCredits(getPassedSubjects(semesterSubjects));
  if (sumOfPassedWeightedCredits === 0 || registeredCredits === 0) return 0;

  return round(sumOfPassedWeightedCredits / registeredCredits, 2);
};

const getCI = (semesterSubjects: Subject[]) => {
  const sumOfPassedWeightedCredits = sumOfWeightedCredits(getPassedSubjects(semesterSubjects));
  if (sumOfPassedWeightedCredits === 0) return 0;
  return round(sumOfPassedWeightedCredits / 30, 2);
};

const getCCI = (semesterSubjects: Subject[]) => {
  const CI = getCI(semesterSubjects);
  const passedCredits = getPassedCredits(semesterSubjects);
  const registeredCredits = getRegisteredCredits(semesterSubjects);
  if (passedCredits === 0 || CI === 0) return 0;
  return round((CI * passedCredits) / registeredCredits, 2);
};

export {getPassedCredits, getRegisteredCredits, getCompletionRate, getAVG, getGPA, getCI, getCCI};
