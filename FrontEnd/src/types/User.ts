export type User = {
  uid: number | null;
  token: string | null;
  user: FrontendUser | null;
  data: dataModel | null;
  isLoggedIn: boolean;
};

type dataModel = {
  universities: number[];
  unidata: {id: number; semester: number; semesterID: number; semesterStart: string}[];
};

export type FrontendUser = {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
};
