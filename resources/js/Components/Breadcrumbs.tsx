import {NavLink} from "react-router-dom";
import {FC} from "react";
import {useAtomValue} from "jotai/react";
import {breadcrumbsRoutes} from "@/store/atoms";

const Breadcrumbs: FC = () => {
  const routesArray = useAtomValue(breadcrumbsRoutes);
  return (
    <div className="breadcrumbs text-sm my-auto mx-5">
      <ul>
        {routesArray.map(({name, to}) => {
          return (
            <li key={name}>
              <NavLink to={to}>{name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Breadcrumbs;
