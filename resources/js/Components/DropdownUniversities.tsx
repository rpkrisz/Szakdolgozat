import {FC} from "react";
import {NavLink} from "react-router-dom";

const DropdownUniversities: FC<{
  label: string;
  items: {name: string; id: string}[] | undefined;
}> = ({label, items}) => {
  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost text-xl text-center flex self-center">
        {label}
      </div>
      <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-4 w-52 p-2 shadow">
        {items?.map(({name, id}) => (
          <li key={id}>
            <NavLink to={`/universities/${id}`}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownUniversities;
