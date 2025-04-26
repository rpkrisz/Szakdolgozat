import {Semester} from "./Semester";

export type University = {
  id: string;
  name: string;
  nickName: string;
  faculty: string;
  major: string;
  degreeLevel: string;
  semesters: Semester[];
  semestersCount: number;
  currSemester: number;
  currSemFstDay: string;
  specialisation: string;
  userID: string;
};

export type UniversityForm = {
  name: string;
  nickName: string;
  faculty: string;
  major: string;
  degreeLevel: string;
  semestersCount: number;
  currSemester: number;
  currSemFstDay: string;
  specialisation: string;
};
