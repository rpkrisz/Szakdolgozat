import useHeaders from "@/hooks/useHeaders";
import {userAtom} from "@/store/atoms";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {useAtom, useSetAtom} from "jotai/react";
import {useNavigate} from "react-router-dom";
import {authHeaders} from ".";
import navigateRoutes from "@/NavigationRoutes";
import {useEffect} from "react";
import {FrontendUser, LogInData, RegisterData, LoginType, UniInfoType} from "@/types";
import {ResponseTypeWithData} from "@/types/Api";
import {toast} from "react-toastify";

const useGetAPI = () => {
  return useSuspenseQuery({
    queryKey: ["API"],
    queryFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api");
      return await response.json();
    },
  });
};

const register = async (userData: RegisterData) => {
  const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/register", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(userData),
  });
  return await response.json();
};

const useRegister = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: async (loginInfo: LoginType) => {
      if (!loginInfo.token) return toast.error("All fields are required!");

      setUser({
        uid: loginInfo.user.id,
        token: loginInfo.token,
        user: {
          id: loginInfo.user.id,
          firstName: loginInfo.user.firstName,
          lastName: loginInfo.user.lastName,
          nickName: loginInfo.user.nickName,
          email: loginInfo.user.email,
        },
        data: {
          universities: loginInfo.data.map(uni => uni.id),
          unidata: loginInfo.data.map(uni => {
            return {
              id: uni.id,
              semester: uni.semester,
              semesterID: uni.semesterID,
              semesterStart: uni.semesterStart,
            };
          }),
        },
        isLoggedIn: true,
      });
      navigate(navigateRoutes.homePage);
    },
  });
};

const login = async (userData: LogInData) => {
  const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/login", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(userData),
  });
  return await response.json();
};

const useLogin = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async (loginInfo: LoginType) => {
      if (!loginInfo.token) return toast.error("Something went wrong! Try angain!");

      setUser({
        uid: loginInfo.user.id,
        token: loginInfo.token,
        user: {
          id: loginInfo.user.id,
          firstName: loginInfo.user.firstName,
          lastName: loginInfo.user.lastName,
          nickName: loginInfo.user.nickName,
          email: loginInfo.user.email,
        },
        data: {
          universities: loginInfo.data.map(uni => uni.id),
          unidata: loginInfo.data.map(uni => {
            return {
              id: uni.id,
              semester: uni.semester,
              semesterID: uni.semesterID,
              semesterStart: uni.semesterStart,
            };
          }),
        },
        isLoggedIn: true,
      });
      const url = window.history.state.usr.split("/");
      url[url.length - 1] === "hero" || url[url.length - 1] === "" ? navigate(navigateRoutes.homePage) : navigate(-1);
    },
  });
};

const useLogout = () => {
  const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();
  const header = useHeaders();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/logout", {
        method: "DELETE",
        headers: header,
      });
      return await response.json();
    },
    onSuccess: async () => {
      navigate(navigateRoutes.heroPage);
      await queryClient.removeQueries();
      setUser({
        uid: null,
        token: null,
        user: null,
        data: null,
        isLoggedIn: false,
      });
    },
  });
};

const useGetUser = (): [
  data: [FrontendUser, UniInfoType[]],
  query: UseSuspenseQueryResult<[FrontendUser, UniInfoType[]], Error>,
] => {
  const [{token}, setUser] = useAtom(userAtom);
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/users`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });

  useEffect(() => {
    if (query.data.user) {
      const userInfo: LoginType = query.data;
      setUser({
        uid: userInfo.user.id,
        token: token,
        user: {
          id: userInfo.user.id,
          firstName: userInfo.user.firstName,
          lastName: userInfo.user.lastName,
          nickName: userInfo.user.nickName,
          email: userInfo.user.email,
        },
        data: {
          universities: userInfo.data.map(uni => uni.id),
          unidata: userInfo.data.map(uni => {
            return {
              id: uni.id,
              semester: uni.semester,
              semesterID: uni.semesterID,
              semesterStart: uni.semesterStart,
            };
          }),
        },
        isLoggedIn: true,
      });
    }
  }, [token, query.data, setUser]);
  return [[query.data.user, query.data.data], query];
};

// ------------- UPDATE ------------- //
const useUpdateUser = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<FrontendUser>, Error, FrontendUser, unknown>,
  query: UseMutationResult<ResponseTypeWithData<FrontendUser>, Error, FrontendUser, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (formData: FrontendUser) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/profile/${formData.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["user"]});
    },
  });

  return [query.mutate, query];
};

export {useGetAPI, useLogin, useRegister, useGetUser, useLogout, useUpdateUser};
