export type Task = {
  id: string;
  name: string;
  dueDate: string;
  weight: number;
  type: "midterm" | "quiz" | "assignment" | "exam" | "homeWork" | "bonusPoint";
  state: "inprogress" | "done" | "graded" | "faild";
  score: number;
  taskPage: string;
  universityID: string;
  subjectID: string;
  userID: string;
};

export type TaskForm = {
  name: string;
  dueDate: string;
  weight: number;
  taskPage: string;
  type: string;
  subjectID: string;
  universityID: string;
};

export type tasksPerMonthType = {
  January?: number;
  February?: number;
  March?: number;
  April?: number;
  May?: number;
  June?: number;
  July?: number;
  August?: number;
  September?: number;
  October?: number;
  November?: number;
  December?: number;
};

export type urgentTaskData = {id: string; name: string; tasks: Task[]; tasksPerMonth: number[]};
