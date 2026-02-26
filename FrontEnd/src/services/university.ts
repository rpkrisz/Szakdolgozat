import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import useHeaders from "@/hooks/useHeaders";
import {University, UniversityForm, Semester, Subject, ResponseType} from "@/types";
import {ResponseTypeWithData} from "@/types/Api";
import {toast} from "react-toastify";

type uninamesType = {id: number; name: string; nickName: string};
type uniAndSemestersType = {University: University; semesters: Semester[]};

// ------------- GET ALL ------------- //
const useGetUniversities = (): [data: University[], query: UseSuspenseQueryResult<University, Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/universities", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [query.data.data as University[], query];
};

// ------------- GET ONE ------------- //
const useGetUniversity = (
  id: string | number
): [data: University, query: UseSuspenseQueryResult<University, Error>] => {
  const headers = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["university", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/${id}`, {
        method: "GET",
        headers,
      });
      return await response.json();
    },
  });

  return [query.data.data ?? {}, query];
};

// ------------- CREATE ------------- //
const useCreateUniversity = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<uniAndSemestersType>, Error, UniversityForm, unknown>,
  query: UseMutationResult<ResponseTypeWithData<uniAndSemestersType> | undefined, Error, UniversityForm, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["createUniversity"],
    mutationFn: async (formData: UniversityForm) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["universitiesNames"]});
      await queryClient.invalidateQueries({queryKey: ["universityNames", response.data.id]});
    },
  });

  return [query.mutate, query];
};

// ------------- UPDATE ------------- //
const useUpdateUniversity = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<University>, Error, University, unknown>,
  query: UseMutationResult<ResponseTypeWithData<University>, Error, University, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["updateUniversity"],
    mutationFn: async (formData: University) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/${formData.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["university", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["universitySemesters", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["universitiesNames"]});
      await queryClient.invalidateQueries({queryKey: ["universityNames", response.data.id]});
    },
  });

  return [query.mutate, query];
};

// ------------- DELETE ------------- //
const useDeleteUniversity = (): [
  mutateFn: UseMutateFunction<ResponseType, Error, string | number, unknown>,
  query: UseMutationResult<University, Error, string | number, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["deleteUniversity"],
    mutationFn: async (id: string | number) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/${id}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify(id),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["universitiesNames"]});
      await queryClient.removeQueries({queryKey: ["universitySemesters", response.data.id]});
      await queryClient.removeQueries({queryKey: ["universityNames", response.data.id]});
    },
  });

  return [query.mutate, query];
};

// ------------- GET - DOWN ------------- //
const useGetUniversitySemesters = (
  id: string | number
): [data: Semester[] | [], query: UseSuspenseQueryResult<Semester[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["universitySemesters", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/${id}/semesters`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as Semester[]) ?? [], query];
};

const useGetUniversitySubjects = (
  id: string | number
): [data: Subject[] | [], query: UseSuspenseQueryResult<Subject[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["universitySubjects", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/${id}/subjects`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as Subject[]) ?? [], query];
};

const useGetUniversitiesNames = (): [data: uninamesType[], query: UseSuspenseQueryResult<uninamesType[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["universitiesNames"],
    queryFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/universities/names", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as uninamesType[]) ?? [], query];
};

const useGetUniversityNames = (
  id: string | number
): [data: uninamesType, query: UseSuspenseQueryResult<uninamesType, Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["universityNames", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/universities/names/${id}`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as uninamesType) ?? [], query];
};

export {
  useGetUniversities,
  useGetUniversity,
  useCreateUniversity,
  useUpdateUniversity,
  useDeleteUniversity,
  useGetUniversitySemesters,
  useGetUniversitySubjects,
  useGetUniversitiesNames,
  useGetUniversityNames,
};
