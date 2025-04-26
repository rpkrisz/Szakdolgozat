const maxTasksPerMonth = (tasksPerMonth: number[], maxTasksPerMonth: number[]) => {
  for (let month = 0; month < tasksPerMonth.length; month++) {
    const taskNum = tasksPerMonth[month];

    if (!maxTasksPerMonth[month]) {
      maxTasksPerMonth[month] = taskNum;
    } else {
      if (maxTasksPerMonth[month] < taskNum) {
        maxTasksPerMonth[month] = taskNum;
      }
    }
  }
  return maxTasksPerMonth;
};

export default maxTasksPerMonth;
