import {Task} from "./Task";

export type Subject = {
  id: string;
  name: string;
  courseType: string;
  credit: number;
  semester: number;
  notes: string;
  isGraded: boolean;
  grade: number;
  tasks: string[];
  scores: Scores;
  detailsID: string;
  universityID: string;
  userID: string;
};

export type SubjectForm = {
  name: string;
  courseType: string;
  credit: number;
  semester: number;
  notes: string;
  universityID: string;
  grade: number;
  isGraded: boolean;
};

export type SubjectData = {
  id: string;
  name: string;
  courseType: string;
  credit: number;
  semester: number;
  notes: string;
  isGraded: boolean;
  grade: number;
  tasks: Task[];
  tasksPerMonth: number[];
  detailsID: string;
  universityID: string;
  userID: string;
};

type Scores = {
  midterms: number;
  quizes: number;
  assignments: number;
  exams: number;
  homeWorks: number;
  bonusPoints: number;
  sumScores: number;
  maxScore: number;
};
