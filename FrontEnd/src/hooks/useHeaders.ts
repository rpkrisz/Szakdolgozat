import {userAtom} from "@/store/atoms";
import {useAtomValue} from "jotai/react";

const useHeaders = () => {
  const {token} = useAtomValue(userAtom);
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default useHeaders;
