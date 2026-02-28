import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import useHeaders from "@/hooks/useHeaders";
import {Semester, Subject, SubjectForm, Task, TaskCount, ResponseType, SubjectNames} from "@/types";
import {taksCountComplier} from "@/utils/";
import {ResponseTypeWithData} from "@/types/Api";
import {toast} from "react-toastify";

// ------------- GET ALL ------------- //
const useGetSubjects = (): [data: Subject[], query: UseSuspenseQueryResult<Subject[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/subjects/", {method: "GET", headers: header});
      return await response.json();
    },
  });
  return [query.data.data as Subject[], query];
};

// ------------- GET ONE ------------- //
const useGetSubject = (id: string | number): [data: Subject, query: UseSuspenseQueryResult<Subject, Error>] => {
  const headers = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["subject", Number(id)],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/subjects/${id}`, {method: "GET", headers});
      return await response.json();
    },
  });
  return [query.data.data ?? {}, query];
};

// ------------- CREATE ------------- //
const useCreateSubject = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<Subject>, Error, SubjectForm, unknown>,
  query: UseMutationResult<ResponseTypeWithData<Subject>, Error, SubjectForm, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["createSubject"],
    mutationFn: async (formData: SubjectForm) => {
      const response = await fetch(`http://localhost:8000/api/subjects/`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["semester", response.data.semesterID]});
      await queryClient.invalidateQueries({queryKey: ["semesterSubjects", response.data.semesterID]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["subjectNames"]});
    },
  });

  return [query.mutate, query];
};

// ------------- UPDATE ------------- //
const useUpdateSubject = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<Subject>, Error, Subject, unknown>,
  query: UseMutationResult<ResponseTypeWithData<Subject>, Error, Subject, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["updateSubject"],
    mutationFn: async (formData: Subject) => {
      const response = await fetch(`http://localhost:8000/api/subjects/${formData.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["subject", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["subjectTasks", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["subjectSemester", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["semester", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["subjectNames"]});
    },
  });

  return [query.mutate, query];
};

// ------------- DELETE ------------- //
const useDeleteSubject = (): [
  mutateFn: UseMutateFunction<ResponseType | undefined, Error, string | number, unknown>,
  query: UseMutationResult<ResponseType | undefined, Error, string | number, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["deleteSubject"],
    mutationFn: async (id: string | number) => {
      const response = await fetch(`http://localhost:8000/api/subjects/${id}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify(id),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.removeQueries({queryKey: ["subject", response.data.id]});
      await queryClient.removeQueries({queryKey: ["subjectTasks", response.data.id]});
      await queryClient.removeQueries({queryKey: ["subjectSemester", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["subjectNames"]});
    },
  });

  return [query.mutate, query];
};

// ------------- GET - UP ------------- //
const useGetSubjectSemester = (
  id: string
): [data: Semester | undefined, query: UseSuspenseQueryResult<Semester | undefined, Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["subjectSemester", Number(id)],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/subjects/${id}/semester`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [query.data.data as Semester, query];
};

// ------------- GET - DOWN ------------- //
const useGetSubjectTasks = (
  id: string
): [data: [number[], Task[]], query: UseSuspenseQueryResult<[number[], Task[]] | [], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["subjectTasks", Number(id)],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/subjects/${id}/tasks`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });

  const tasks = query.data.data as [TaskCount, Task[]];

  return [[taksCountComplier(tasks[0]), tasks[1]], query];
};

const useGetSubjectNames = (): [data: SubjectNames[], query: UseSuspenseQueryResult<SubjectNames[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["subjectNames"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/subjects/names", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as SubjectNames[]) ?? [], query];
};

export {
  useGetSubjects,
  useGetSubject,
  useCreateSubject,
  useUpdateSubject,
  useDeleteSubject,
  useGetSubjectSemester,
  useGetSubjectTasks,
  useGetSubjectNames,
};
