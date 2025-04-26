export type Task = {
  id: number;
  name: string;
  dueDate: string;
  weight: number;
  type: TaskTypes;
  taskPage: string;
  description: string;
  score: number;
  stage: Taskstages;
  universityID: number;
  semesterID: number;
  subjectID: number;
  userID: number;
};

export type TaskForm = {
  name: string;
  dueDate: string;
  weight: number;
  type: TaskTypes | string;
  taskPage: string;
  description: string;
  universityID: number;
  semesterID: number;
  subjectID: number;
};

type Taskstages = "inprogress" | "done" | "graded" | "faild";

type TaskTypes = "midterm" | "quiz" | "assignment" | "exam" | "homework" | "bonus_point";

export type TaskCount = {
  "01": number;
  "02": number;
  "03": number;
  "04": number;
  "05": number;
  "06": number;
  "07": number;
  "08": number;
  "09": number;
  "10": number;
  "11": number;
  "12": number;
};

export type TaskSelectionType = [
  string,
  {
    tasks: Task[];
    id: string;
    tasksPerMonth: number[];
    name: string;
  }[]
][];

export type TaskShowDataType = [
  string,
  {
    tasks: Task[];
    id: number;
    tasksPerMonth: number[];
    name: string;
  }[]
];
