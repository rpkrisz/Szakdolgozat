export type Semester = {
  id: number;
  name: string;
  average: number;
  weightedAverage: number;
  creditIndex: number;
  correctedCreditIndex: number;
  registeredCredit: number;
  passeedCredit: number;
  completionRate: number;
  subjects: string[];
};
