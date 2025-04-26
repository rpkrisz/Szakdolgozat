import {User as FirebaseUser} from "firebase/auth";

export type User = {
  uid: string | null;
  firebaseUser: FirebaseUser | null;
  data: dataModel | null;
  isLoggedIn: boolean;
};

type dataModel = {
  universities: string[];
  unidata: {id: string; semester: number; semesterStart: string}[];
};
