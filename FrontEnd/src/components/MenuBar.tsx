import {NavLink} from "react-router-dom";
import Dropdown from "./DropdownUniversities";
import {useAtomValue} from "jotai/react";
import {userAtom} from "@/store/atoms";
import {useGetUser, useLogout, useGetUniversitiesNames} from "@/services";
import navigateRoutes from "@/NavigationRoutes";
import ThemeController from "./ThemeController";
import ApplicationLogo from "./ApplicationLogo";
import {Award, BookCheck, Calculator, House, User} from "lucide-react";

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
          <House />
          Home
        </NavLink>
        <NavLink to={navigateRoutes.profilePage} className="btn btn-ghost text-xl">
          <User />
          Profile
        </NavLink>
        <NavLink to={navigateRoutes.tasksPage} className="btn btn-ghost text-xl">
          <BookCheck />
          Tasks
        </NavLink>
        <NavLink to={navigateRoutes.appraisalsPage} className="btn btn-ghost text-xl">
          <Award />
          Appraisals
        </NavLink>
        <NavLink to={navigateRoutes.gradecalculatorPage} className="btn btn-ghost text-xl">
          <Calculator />
          Grade calculator
        </NavLink>
        {universitiyNames.length > 0 && <Dropdown label="Universites" items={universitiyNames} />}
      </div>
      <div className="flex items-center gap-4 zero:align-top zero:justify-around zero:flex-row">
        <NavLink to={navigateRoutes.profilePage} className="flex flex-row items-center gap-2">
          <p className="hidden xl:block">Hello, {user.user?.nickName ?? user.user?.firstName}!</p>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
              <span className="text-xs ">{userAPI?.firstName[0]}</span>
            </div>
          </div>
        </NavLink>
        <ThemeController />
        <button onClick={() => logOut()} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </nav>
  );
}
