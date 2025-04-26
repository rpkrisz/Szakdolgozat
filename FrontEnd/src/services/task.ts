import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import useHeaders from "@/hooks/useHeaders";
import {taksCountComplier} from "@/utils/";
import {Task, TaskCount, TaskForm, TaskNames, ResponseType} from "@/types";
import {ResponseTypeWithData} from "@/types/Api";
import {toast} from "react-toastify";

// ------------- GET ALL ------------- //
const useGetTasks = (): [data: [number[], Task[]], query: UseSuspenseQueryResult<[number[], Task[]], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/tasks", {method: "GET", headers: header});
      return await response.json();
    },
  });

  const tasks = query.data.data as [TaskCount, Task[]];

  return [[taksCountComplier(tasks[0]), tasks[1]], query];
};

// ------------- GET ONE ------------- //
const useGetTask = (id: string | number): [data: Task, query: UseSuspenseQueryResult<Task, Error>] => {
  const headers = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["task", Number(id)],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {method: "GET", headers});
      return await response.json();
    },
  });

  return [query.data.data ?? {}, query];
};

// ------------- CREATE ------------- //
const useCreateTask = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<Task>, Error, TaskForm, unknown>,
  query: UseMutationResult<ResponseTypeWithData<Task>, Error, TaskForm, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (formData: TaskForm) => {
      const response = await fetch(`http://localhost:8000/api/tasks/`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["subject", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["subjectTasks", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["urgentTasks"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["universitySemesters", response.data.universityID]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
    },
  });

  return [query.mutate, query];
};

// ------------- UPDATE ------------- //
const useUpdateTask = (): [
  mutateFn: UseMutateFunction<ResponseTypeWithData<Task>, Error, Task, unknown>,
  query: UseMutationResult<ResponseTypeWithData<Task>, Error, Task, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (formData: Task) => {
      const response = await fetch(`http://localhost:8000/api/tasks/${formData.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["task", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["subject", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["subjectTasks", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["taskSubject", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["urgentTasks"]});
    },
  });

  return [query.mutate, query];
};

// ------------- DELETE ------------- //
const useDeleteTask = (): [
  mutateFn: UseMutateFunction<ResponseType, Error, string | number, unknown>,
  query: UseMutationResult<ResponseType, Error, string | number, unknown>
] => {
  const headers = useHeaders();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (id: string | number) => {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify(id),
      });
      return await response.json();
    },
    onSuccess: async response => {
      toast.success(response.message);
      await queryClient.invalidateQueries({queryKey: ["tasks"]});
      await queryClient.invalidateQueries({queryKey: ["subjectTasks", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["subjects"]});
      await queryClient.invalidateQueries({queryKey: ["taskSubject", response.data.id]});
      await queryClient.invalidateQueries({queryKey: ["subject", response.data.subjectID]});
      await queryClient.invalidateQueries({queryKey: ["universities"]});
      await queryClient.invalidateQueries({queryKey: ["semesters"]});
      await queryClient.invalidateQueries({queryKey: ["urgentTasks"]});
    },
  });

  return [query.mutate, query];
};

// ------------- GET - UP ------------- //
const useGetTaskSubject = (
  id: string | number
): [data: Task | undefined, query: UseSuspenseQueryResult<Task | undefined, Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["taskSubject", Number(id)],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/subject`, {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [query.data.data as Task, query];
};

const useGetTaskNames = (): [data: TaskNames[], query: UseSuspenseQueryResult<TaskNames[], Error>] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["tasksNames"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/tasks/names", {
        method: "GET",
        headers: header,
      });
      return await response.json();
    },
  });
  return [(query.data.data as TaskNames[]) ?? [], query];
};

const useGetUrgentTasks = (): [
  data: [number[], Task[], Task[]] | [],
  query: UseSuspenseQueryResult<[number[], Task[], Task[]] | [], Error>
] => {
  const header = useHeaders();
  const query = useSuspenseQuery({
    queryKey: ["urgentTasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/tasks/urgent", {method: "GET", headers: header});
      return await response.json();
    },
  });
  if (!query.data.data) return [[], query];
  const tasks = query.data.data as [TaskCount, Task[], Task[]];

  return [[taksCountComplier(tasks[0]), tasks[1], tasks[2]], query];
};

export {
  useGetTasks,
  useGetTask,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useGetTaskSubject,
  useGetTaskNames,
  useGetUrgentTasks,
};
