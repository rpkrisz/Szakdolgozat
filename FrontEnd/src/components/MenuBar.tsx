import {NavLink, Link} from "react-router-dom";
import Dropdown from "./DropdownUniversities";
import {useAtomValue} from "jotai/react";
import {userAtom} from "@/store/atoms";
import {useGetUser, useLogout, useGetUniversitiesNames} from "@/services";
import navigateRoutes from "@/NavigationRoutes";
import ThemeController from "./ThemeController";
import ApplicationLogo from "./ApplicationLogo";

export default function MenuBar() {
  const user = useAtomValue(userAtom);
  const {mutate: logOut} = useLogout();
  const [universitiyNames] = useGetUniversitiesNames();
  const [[userAPI]] = useGetUser();

  return (
    <nav className="text-base-content bg-base-300 p-2 gap-2 zero:flex zero:flex-row lg:navbar lg:flex lg:flex-grow lg:justify-between lg:items-center">
      <div className="lg:flex flex-col lg:flex-row lg:items-center zero:hidden">
        <ApplicationLogo className="size-14 m-2" />
        <NavLink to={navigateRoutes.homePage} className="btn btn-ghost text-xl">
          Home
        </NavLink>
        <NavLink to={navigateRoutes.profilePage} className="btn btn-ghost text-xl">
          Profile
        </NavLink>
        <NavLink to={navigateRoutes.tasksPage} className="btn btn-ghost text-xl">
          Tasks
        </NavLink>
        <NavLink to={navigateRoutes.appraisalsPage} className="btn btn-ghost text-xl">
          Appraisals
        </NavLink>
        <NavLink to={navigateRoutes.gradecalculatorPage} className="btn btn-ghost text-xl">
          Grade calculator
        </NavLink>
        {universitiyNames.length > 0 && <Dropdown label="Universites" items={universitiyNames} />}
      </div>
      <div className="flex items-center gap-2 zero:align-top zero:justify-around zero:flex-row">
        <p className="mr-4 hidden xl:block">
          Hello, <Link to={navigateRoutes.profilePage}>{user.user?.nickName ?? user.user?.firstName}</Link>!
        </p>
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
            <NavLink to={navigateRoutes.profilePage}>
              <span className="text-xs ">{userAPI?.firstName[0]}</span>
            </NavLink>
          </div>
        </div>
        <ThemeController />
        <button onClick={() => logOut()} className="btn btn-primary lg:ml-4">
          Log Out
        </button>
      </div>
    </nav>
  );
}
