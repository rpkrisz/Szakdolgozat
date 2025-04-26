import { Subject } from "@/types";

const calculateGrade = (subject: Subject, currScore: number) => {
  const limits: ["pointsFor5", "pointsFor4", "pointsFor3", "pointsFor2"] = [
    "pointsFor5",
    "pointsFor4",
    "pointsFor3",
    "pointsFor2",
  ];

  for (let index = 0; index < 4; index++) {
    if (subject[limits[index]] <= currScore) {
      return 5 - index;
    }
  }

  return 1;
};

export default calculateGrade;