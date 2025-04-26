import { FrontendUser } from "./User";

export type ResponseType = {success: boolean; message: string};
export type ResponseTypeWithData<dataType> = {success: boolean; message: string; data: dataType};

export type UniInfoType = {
  id: number;
  semester: number;
  semesterID: number;
  semesterStart: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginType = {
  success: boolean;
  message: string;
  token: string;
  user: FrontendUser;
  data: UniInfoType[];
};

export type LogInData = {
  email: string;
  password: string;
};

export type TaskNames = {
  id: number;
  name: string;
  universityID: number;
  semesterID: number;
  subjectID: number;
};

export type SubjectNames = {
  id: number;
  name: string;
  universityID: number;
  semesterID: number;
};

export type SemesterNames = {
  id: number;
  name: string;
  universityID: number;
};
