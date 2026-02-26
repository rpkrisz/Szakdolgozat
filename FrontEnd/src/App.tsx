import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UiKit from "./UiKit";
import Layout from "./Layouts/BaseLayout";
import University from "./pages/University";
import Subject from "./pages/Subject";
import Semester from "./pages/Semester";
import Predictions from "./pages/Predictions";
import Tasks from "./pages/Tasks";
import Appraisals from "./pages/Appraisals";
import GradeCalculator from "./pages/GradeCalculator";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import Register from "./pages/Register";
import GuestLayout from "./Layouts/GuestLayout";
import navigateRoutes from "./NavigationRoutes";
import TimeConsumptions from "./pages/TimeConsumptions";
import NotFound from "./pages/NotFound";
import {Suspense} from "react";
import {GradeCalculatorSkeleton, UniversitySkeleton, SemesterSkeleton, SubjectSkeleton} from "./components/Feedbacks";
import {getDefaultStore} from "jotai";
import {userAtom} from "./store/atoms";

// This triggers the storage read immediately upon JS execution
const store = getDefaultStore();
store.get(userAtom);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />, // Universal error element at the root level
    element: <Layout />,
    children: [
      {
        path: navigateRoutes.homePage,
        element: <Home />,
      },
      {
        path: navigateRoutes.profilePage,
        element: <Profile />,
      },
      {
        path: navigateRoutes.tasksPage,
        element: <Tasks />,
      },
      {
        path: navigateRoutes.appraisalsPage,
        element: <Appraisals />,
      },
      {
        path: navigateRoutes.gradecalculatorPage,
        element: (
          <Suspense fallback={<GradeCalculatorSkeleton />}>
            <GradeCalculator />
          </Suspense>
        ),
      },
      {
        path: "universities/:universityID",
        element: (
          <Suspense fallback={<UniversitySkeleton />}>
            <University />
          </Suspense>
        ),
      },
      {
        path: "universities/:universityID/tasks",
        element: <Tasks />,
      },
      {
        path: "universities/:universityID/appraisals",
        element: <Appraisals />,
      },
      {
        path: "semesters/:universityID/:semesterID",
        element: (
          <Suspense fallback={<SemesterSkeleton />}>
            <Semester />
          </Suspense>
        ),
      },
      {
        path: "semesters/:universityID/:semesterID/tasks",
        element: <Tasks />,
      },
      {
        path: "semesters/:universityID/:semesterID/predictions",
        element: <Predictions />,
      },
      {
        path: "semesters/:universityID/:semesterID/weekly_time_consumptions",
        element: <TimeConsumptions />,
      },
      {
        path: "subjects/:subjectID",
        element: (
          <Suspense fallback={<SubjectSkeleton />}>
            <Subject />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: navigateRoutes.heroPage,
    element: <Hero />,
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: navigateRoutes.uiPage,
        element: <UiKit />,
      },
      {
        path: navigateRoutes.loginPage,
        element: <Login />,
      },
      {
        path: navigateRoutes.registerPage,
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<NotFound />} />;
}

export default App;
