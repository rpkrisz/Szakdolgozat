import {User} from "@/types/User";
import {atomWithStorage, createJSONStorage} from "jotai/utils";
import {atom} from "jotai/vanilla";
import {withImmer} from "jotai-immer";

const defaultUser: User = {
  uid: null,
  firebaseUser: null,
  data: null,
  isLoggedIn: false,
};

export const userAtom = withImmer(
  atomWithStorage<User>(
    "user",
    defaultUser,
    createJSONStorage<User>(() => sessionStorage)
  )
);

export const titleAtom = atom("Home");

export const breadcrumbsRoutes = atom([
  {to: "/", name: "Home"},
  {to: "", name: "Now"},
]);

export const editTaskIDAtom = atom<string>();
export const taskEditToggel = atom<boolean>(false);
