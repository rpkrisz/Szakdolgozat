import {useGetUser} from "@/services";
import {userAtom} from "@/store/atoms";
import {useAtomValue} from "jotai/react";

const useIsAuthenticated = () => {
  const {isLoggedIn} = useAtomValue(userAtom);
  const [[userAPI]] = useGetUser();

  return isLoggedIn && userAPI;
};

export default useIsAuthenticated;
