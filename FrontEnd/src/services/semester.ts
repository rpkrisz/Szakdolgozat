import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import useHeaders from "@/hooks/useHeaders";
import {Semester, University, Subject, Task, TaskCount, ResponseType, SemesterNames} from "@/types";
import {taksCountComplier} from "@/utils/";
import {toast} from "react-toastify";

// ------------- GET ALL ------------- //
const useGetSemesters = (): [
  data: Semester[] | undefined,
  query: UseSuspenseQueryResult<Semester[] | undefined, Error>,
] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/semesters", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [query.data.data as Semester[], query];
};

// ------------- GET ONE ------------- //
const useGetSemester = (
  id: string | number
): [data: Semester | undefined, query: UseSuspenseQueryResult<Semester | undefined, Error>] => {
  const headers = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semester", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}`, {
        method: "GET",
        headers,
      });
      return await response.json();
    },
  });
  return [query.data.data as Semester, query];
};

// ------------- CREATE ------------- //
const useCreateSemester = (): [
  response: ResponseType | undefined,
  query: UseMutationResult<ResponseType | undefined, Error, {university_id: number}, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["createSemester"],
    mutationFn: async (formData: {university_id: number}) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["university", response.data.universityID]});
    },
  });

  return [query.data, query];
};

// ------------- UPDATE ------------- //
const useUpdateSemester = (): [
  data: Semester | undefined,
  query: UseMutationResult<Semester | undefined, Error, string | number, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["updateSemester"],
    mutationFn: async (id: string | number) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(id),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["semester", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["semesterSubjects", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["semesterUniversity", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["university", response.data.universityID]});
      await queryClient.invalidateQueries({queryKey: ["universitySemesters", response.data.universityID]});
    },
  });

  return [query.data.data, query];
};

// ------------- DELETE ------------- //
const useDeleteSemester = (): [
  mutateFn: UseMutateFunction<ResponseType | undefined, Error, string | number, unknown>,
  query: UseMutationResult<ResponseType | undefined, Error, string | number, unknown>,
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["deleteSemester"],
    mutationFn: async (id: string | number) => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify(id),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.removeQueries({queryKey: ["semester", response.data.id]});
      await queryClient.removeQueries({queryKey: ["semesterSubjects", response.data.id]});
      await queryClient.removeQueries({queryKey: ["semesterUniversity", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["university", response.data.universityID]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
    },
  });

  return [query.mutate, query];
};

// ------------- GET - UP ------------- //
const useGetSemesterUniversity = (
  id: string | number
): [data: University | undefined, query: UseSuspenseQueryResult<University, Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semesterUniversity", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}/university`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [query.data.data as University, query];
};

// ------------- GET - DOWN ------------- //
const useGetSemesterSubjects = (
  id: string | number
): [data: Subject[], query: UseSuspenseQueryResult<Subject[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semesterSubjects", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}/subjects`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as Subject[]) ?? [], query];
};

const useGetSemesterTasks = (
  id: string | number
): [data: [number[], Task[]], query: UseSuspenseQueryResult<[number[], Task[]] | [], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semesterTasks", Number(id)],
    queryFn: async () => {
      const response = await fetch(`https://task-manager-api-gcwk.onrender.com/api/semesters/${id}/tasks`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });

  const tasks = query.data.data as [TaskCount, Task[]];

  return [[taksCountComplier(tasks[0]), tasks[1]], query];
};

const useGetSemesterNames = (): [data: SemesterNames[], query: UseSuspenseQueryResult<SemesterNames[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["semesterNames"],
    queryFn: async () => {
      const response = await fetch("https://task-manager-api-gcwk.onrender.com/api/semesters/names", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as SemesterNames[]) ?? [], query];
};

export {
  useGetSemesters,
  useGetSemester,
  useCreateSemester,
  useUpdateSemester,
  useDeleteSemester,
  useGetSemesterUniversity,
  useGetSemesterSubjects,
  useGetSemesterNames,
  useGetSemesterTasks,
};
