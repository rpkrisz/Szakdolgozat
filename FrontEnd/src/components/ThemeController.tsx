import {useAtomValue} from "jotai";
import {userAtom} from "@/store/atoms";
import {useUpdateUser} from "@/services";
import {FrontendUser} from "@/types";
import {useEffect, useState} from "react";

const ThemeController = () => {
  const {colorTheme} = useAtomValue(userAtom);

  // const [form, setForm] = useState(userData);
  // const [updateUser] = useUpdateUser();

  // useEffect(() => {
  //   setForm(userData);
  // }, [userData]);

  // const saveColorTheme = async () => {
  //   try {
  //     await updateUser(form as FrontendUser);
  //   } catch (error) {
  //     console.error("User saving faild!");
  //   }
  //   setForm({...form});
  // };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content text-base-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Business"
            value="business"
            defaultChecked={colorTheme === "business"}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dim"
            value="dim"
            defaultChecked={colorTheme === "dim"}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
            defaultChecked={colorTheme === "retro"}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Autumn"
            value="autumn"
            defaultChecked={colorTheme === "autumn"}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Pastel"
            value="pastel"
            defaultChecked={colorTheme === "pastel"}
            onClick={(e) => console.log((e.target as HTMLInputElement).value)}
          />
        </li>
      </ul>
    </div>
  );
};

export default ThemeController;
