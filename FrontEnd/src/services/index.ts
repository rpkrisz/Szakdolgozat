import {useGetSubjects} from "@/services/subject";
import {useGetSubject} from "@/services/subject";
import {useGetSubjectSemester} from "@/services/subject";
import {useCreateSubject} from "@/services/subject";
import {useUpdateSubject} from "@/services/subject";
import {useDeleteSubject} from "@/services/subject";
import {useGetSubjectTasks} from "@/services/subject";
import {useGetSubjectNames} from "@/services/subject";
import {useGetTasks} from "@/services/task";
import {useGetTask} from "@/services/task";
import {useGetTaskNames} from "@/services/task";
import {useGetTaskSubject} from "@/services/task";
import {useCreateTask} from "@/services/task";
import {useUpdateTask} from "@/services/task";
import {useGetUrgentTasks} from "@/services/task";
import {useDeleteTask} from "@/services/task";
import {useGetSemesters} from "@/services/semester";
import {useGetSemester} from "@/services/semester";
import {useCreateSemester} from "@/services/semester";
import {useUpdateSemester} from "@/services/semester";
import {useDeleteSemester} from "@/services/semester";
import {useGetSemesterUniversity} from "@/services/semester";
import {useGetSemesterTasks} from "@/services/semester";
import {useGetSemesterSubjects} from "@/services/semester";
import {useGetSemesterNames} from "@/services/semester";
import {useUpdateUser} from "@/services/auth";
import {useLogout} from "@/services/auth";
import {useGetUser} from "@/services/auth";
import {useRegister} from "@/services/auth";
import {useLogin} from "@/services/auth";
import {useGetAPI} from "@/services/auth";
import {useGetUniversityNames} from "@/services/university";
import {useGetUniversitiesNames} from "@/services/university";
import {useGetUniversitySubjects} from "@/services/university";
import {useGetUniversitySemesters} from "@/services/university";
import {useDeleteUniversity} from "@/services/university";
import {useUpdateUniversity} from "@/services/university";
import {useCreateUniversity} from "@/services/university";
import {useGetUniversity} from "@/services/university";
import {useGetUniversities} from "@/services/university";

export const authHeaders = {
  "Content-Type": "applicatio/json",
  Accept: "applicatio/json",
};

export {
  useGetAPI,
  useLogin,
  useRegister,
  useGetUser,
  useLogout,
  useUpdateUser,
  useGetUniversities,
  useGetUniversity,
  useCreateUniversity,
  useUpdateUniversity,
  useDeleteUniversity,
  useGetUniversitySemesters,
  useGetUniversitySubjects,
  useGetUniversitiesNames,
  useGetUniversityNames,
  useGetSemesters,
  useGetSemester,
  useCreateSemester,
  useUpdateSemester,
  useDeleteSemester,
  useGetSemesterUniversity,
  useGetSemesterSubjects,
  useGetSemesterNames,
  useGetSemesterTasks,
  useGetSubjects,
  useGetSubject,
  useCreateSubject,
  useUpdateSubject,
  useDeleteSubject,
  useGetSubjectSemester,
  useGetSubjectTasks,
  useGetSubjectNames,
  useGetTasks,
  useGetTask,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useGetTaskSubject,
  useGetTaskNames,
  useGetUrgentTasks,
};
