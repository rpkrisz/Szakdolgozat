export type University = {
  id: number;
  name: string;
  nickName: string;
  faculty: string;
  major: string;
  degreeLevel: string;
  semestersCount: number;
  currSemester: number;
  currSemesterID: number;
  currSemFstDay: string;
  specialisation: string;
  userID: number;
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
