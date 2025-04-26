import {auth, collections, db} from "@/firebase";
import {useNavigate, NavLink, Link} from "react-router-dom";
import Dropdown from "./DropdownUniversities";
import {useAtomValue, useSetAtom} from "jotai/react";
import {userAtom} from "@/store/atoms";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import CollapseMenu from "./CollapseMenu";

export default function MenuBar() {
  const [universitiyNames, setUniversitiyNames] = useState<{name: string; id: string}[]>([]);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const q = query(collection(db, collections.universities), where("userID", "==", user.uid));
    const unsubscribe = onSnapshot(q, docSnaps => {
      const names = docSnaps.docs.map(doc => ({
        name: doc.data().name,
        id: doc.id,
      }));
      names.sort((a, b) => a.name.localeCompare(b.name));
      setUniversitiyNames(names);
    });
    return unsubscribe;
  }, [user.uid]);

  const logOut = async () => {
    await auth.signOut();
    setUser(draft => {
      draft.uid = null;
      draft.isLoggedIn = false;
      draft.firebaseUser = null;
      draft.data = null;
    });
    navigate("/login");
  };

  return (
    <nav className="bg-base-300 text-white p-2 gap-2 zero:flex zero:flex-row lg:navbar lg:flex lg:flex-grow lg:justify-between lg:items-center">
      <CollapseMenu universitiyNames={universitiyNames}></CollapseMenu>
      <div className="lg:flex flex-col lg:flex-row lg:items-center zero:hidden">
        <img src="assets/mobile-logo.png" alt="Logo" className="size-14 mr-4" />
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
        {universitiyNames.length > 0 && <Dropdown label="Universites" items={universitiyNames} />}
      </div>
      <div className="flex items-start gap-2 zero:align-top zero:justify-around zero:flex-row">
        <p className="mr-4 hidden xl:block">
          Hello, <Link to="/profile">{user?.firebaseUser?.displayName}</Link>!
        </p>
        {user?.firebaseUser?.photoURL ? (
          <div className="avatar">
            <div className="w-8 rounded-full">
              <Link to="/profile">
                <img src={user.firebaseUser.photoURL} alt="Profile Picture" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
              <NavLink to="/profile">
                <span className="text-xs">{user?.firebaseUser?.displayName?.[0]}</span>
              </NavLink>
            </div>
          </div>
        )}
        <button onClick={logOut} className="btn btn-primary lg:ml-4">
          Log Out
        </button>
      </div>
    </nav>
  );
}
