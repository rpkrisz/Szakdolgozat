import {atomWithStorage, createJSONStorage} from "jotai/utils";
import {atom} from "jotai/vanilla";
import {withImmer} from "jotai-immer";
import {User, Task} from "@/types";
import navigateRoutes from "@/NavigationRoutes";

const defaultUser: User = {
  uid: null,
  token: null,
  user: null,
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

export const breadcrumbsRoutes = atom([{to: navigateRoutes.homePage, name: "Home"}]);

export const viewTaskAtom = atom<Task>();
export const editTaskAtom = atom<Task>();

export const taskEditToggel = atom<boolean>(false);
