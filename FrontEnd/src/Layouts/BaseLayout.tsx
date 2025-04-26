import {Outlet} from "react-router-dom";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";
import {useAtomValue} from "jotai/react";
import {titleAtom} from "@/store/atoms";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/pages/Hero";
import {Loading} from "@/components/Feedbacks";
import {Suspense} from "react";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import SideBar from "@/components/SideBar";

function Layout() {
  const title = useAtomValue(titleAtom);
  const isAuth = useIsAuthenticated();

  if (!isAuth) return <Hero />;

  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header>
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none xl:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
              <h1 className="xl:hidden xl:flex-none block text-base-content bg-base-300 text-3xl p-2 pl-4 mb-1">
                {title}
              </h1>
            </div>
            <div className="hidden flex-none xl:block grow">
              <Suspense fallback={<Loading />}>
                <MenuBar />
              </Suspense>
            </div>
          </div>
          <h1 className="hidden flex-none xl:block text-base-content bg-base-300 text-3xl p-2 pl-4 mb-1">{title}</h1>
          <Breadcrumbs />
        </header>
        <main className="felx justify-start flex-grow m-0 px-8 relativ md:px-28 overflow-clip">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <Suspense fallback={<></>}>
          <SideBar />
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
