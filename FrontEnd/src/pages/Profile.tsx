import UniversitiesTab from "@/components/ProfileTabs/UniversitiesTab";
import UserDataTab from "@/components/ProfileTabs/UserDataTab";
import navigateRoutes from "@/NavigationRoutes";
import {breadcrumbsRoutes, titleAtom, userAtom} from "@/store/atoms";
import {useAtomValue, useSetAtom} from "jotai/react";
import {useEffect} from "react";

function Profile() {
  const user = useAtomValue(userAtom);
  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    setTitle(user.user?.firstName + "'s Profile");
  }, [user, user.user?.firstName, setTitle]);

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([{to: navigateRoutes.homePage, name: "Home"}]);
  }, [setRoutes]);

  return (
    <>
      <div role="tablist" className="tabs tabs-boxed tabs-bordered bg-neutral text-neutral-content">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="User data" />
        <div role="tabpanel" className="tab-content rounded-box p-6">
          <UserDataTab userData={user.user!} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Universities" defaultChecked />
        <div role="tabpanel" className="tab-content  rounded-box p-6">
          <UniversitiesTab />
        </div>
      </div>
    </>
  );
}

export default Profile;
