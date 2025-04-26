import {NavLink} from "react-router-dom";
import {FC} from "react";

const CollapseMenu: FC<{
  universitiyNames: {name: string; id: string}[];
}> = ({universitiyNames}) => {
  return (
    <details className="flex flex-col collapse collapse-arrow overflow-x-auto lg:hidden lg:m-0 lg:p-0">
      <summary className="collapse-title text-xl font-medium">
        <img src="assets/mobile-logo.png" alt="Logo" className="size-14 mr-4" />
      </summary>
      <div className="collapse-content flex flex-col">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Home
        </NavLink>
        <NavLink to="/profile" className="btn btn-ghost text-xl">
          Profile
        </NavLink>
        <NavLink to="/tasks" className="btn btn-ghost text-xl">
          Tasks
        </NavLink>
        <NavLink to="/appraisals" className="btn btn-ghost text-xl">
          Appraisals
        </NavLink>
        <NavLink to="/gradecalculator" className="btn btn-ghost text-xl">
          Grade calculator
        </NavLink>
        {universitiyNames.length > 0 &&
          universitiyNames?.map(({name, id}) => (
            <NavLink key={id} to={`/universities/${id}`} className="btn btn-ghost text-xl">
              {name}
            </NavLink>
          ))}
      </div>
    </details>
  );
};

export default CollapseMenu;
