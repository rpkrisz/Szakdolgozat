import {NavLink, Link} from "react-router-dom";
import {useAtomValue} from "jotai/react";
import {userAtom} from "@/store/atoms";
import {useGetUser, useLogout, useGetUniversitiesNames} from "@/services";
import navigateRoutes from "@/NavigationRoutes";
import ApplicationLogo from "./ApplicationLogo";
import { Award, BookCheck, Calculator, House, University, User } from "lucide-react";

export default function SideBar() {
  const user = useAtomValue(userAtom);
  const {mutate: logOut} = useLogout();
  const [universitiyNames] = useGetUniversitiesNames();
  const [[userAPI]] = useGetUser();

  return (
    <>
      <nav className="flex flex-col bg-base-300 text-base-content menu min-h-full w-80 p-0">
        <div className="flex flex-row items-center justify-start gap-2 bg-primary p-2 mb-1">
          <ApplicationLogo className="size-14 m-2" />
          <p className="text-3xl text-center font-bold text-primary-content bg-primary p-2 mb-1">Task Manager</p>
        </div>
        <div className="flex flex-row justify-start gap-4 bg-base-100 p-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full flex justify-center items-center ">
              <NavLink to={navigateRoutes.profilePage}>
                <span className="flex justify-center items-center text-xs">{userAPI?.firstName[0]}</span>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <Link to={navigateRoutes.profilePage}>
              <p className="text-lg  mr-4">Hello, {user.user?.nickName ?? user.user?.firstName}!</p>
            </Link>
            <p className="text-xs text-base-content">
              {user.user?.firstName} {user.user?.lastName}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <NavLink to={navigateRoutes.homePage} className="btn btn-ghost text-xl justify-start w-full">
            <House />
            Home
          </NavLink>
          <NavLink to={navigateRoutes.profilePage} className="btn btn-ghost text-xl justify-start w-full">
            <User />
            Profile
          </NavLink>
          <NavLink to={navigateRoutes.tasksPage} className="btn btn-ghost text-xl justify-start w-full">
            <BookCheck />
            Tasks
          </NavLink>
          <NavLink to={navigateRoutes.appraisalsPage} className="btn btn-ghost text-xl justify-start w-full">
            <Award />
            Appraisals
          </NavLink>
          <NavLink to={navigateRoutes.gradecalculatorPage} className="btn btn-ghost text-xl justify-start w-full">
            <Calculator />
            Grade calculator
          </NavLink>
          {universitiyNames.length > 0 &&
            universitiyNames?.map(({nickName, id}) => (
              <NavLink key={id} to={`/universities/${id}`} className="btn btn-ghost text-xl justify-start w-full">
                <University />
                {nickName}
              </NavLink>
            ))}
        </div>
        <div className="divider"></div>
        <div className="flex flex-col justify-start px-4 gap-2">
          <p className="text-lg">Theme</p>
          <ul>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Business"
                value="business"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Dim"
                value="dim"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Autumn"
                value="autumn"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Pastel"
                value="pastel"
              />
            </li>
          </ul>
        </div>
        <div className="divider"></div>
        <div className="p-4 flex flex-col items-center justify-center">
          <button onClick={() => logOut} className="btn btn-primary w-full">
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
}
