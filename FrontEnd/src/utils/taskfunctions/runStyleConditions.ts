import { Task } from "@/types";

function isInweek(dueDate: Date) {
  const nextmonth = new Date().getMonth() + 1; // because monthes is indexed from 0
  const month = new Date().getMonth(); // because monthes is indexed from 0
  if (new Date(dueDate).getMonth() === month || new Date(dueDate).getMonth() === nextmonth) {
    if (
      0 <= new Date(dueDate).getTime() - new Date().getTime() &&
      new Date(dueDate).getTime() - new Date().getTime() <= 86400000 * 7
    ) {
      return true;
    }
  }
  return false;
}

function isPastdDate(dueDate: Date) {
  return new Date(dueDate).getTime() < new Date().getTime();
}

function runStyleConditions(task: Task) {
  const dueDate = new Date(task.dueDate);
  // clear
  let style = "";

  // task is relevante in this week
  if (isInweek(dueDate)) {
    style = "relevant";
  }

  // task is in the past => done/faild
  if (isPastdDate(dueDate)) {
    if (task.stage !== "done") {
      style = "faild";
    } else {
      style = task.stage.toLowerCase();
    }
  }

  // task finished
  if (task.score > 0) {
    if (task.stage === "faild") {
      style = "faild";
    } else {
      style = "graded";
    }
  }

  if (style === "") style = task.type.toLowerCase();

  return style;
}

export default runStyleConditions;