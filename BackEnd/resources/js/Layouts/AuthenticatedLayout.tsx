import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import Footer from "@/Components/Footer";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {titleAtom} from "@/store/atoms";
import {Head, Link, usePage} from "@inertiajs/react";
import {useAtom, useAtomValue} from "jotai/react";
import {PropsWithChildren, ReactNode, useState} from "react";

export default function Authenticated({header, children}: PropsWithChildren<{header?: string}>) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(true);
  const title = useAtomValue(titleAtom);

  return (
    <div className="min-h-screen bg-base-300">
      <nav className="border-b border-gray-100 bg-neutral text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink href={route("gradecalculator")} active={route().current("gradecalculator")}>
                  Grade calculator
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent  px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out focus:outline-none"
                      >
                        {user.name}

                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route("logout")} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown(previousState => !previousState)}
                className="inline-flex items-center justify-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100  focus:bg-gray-100  focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route("gradecalculator")} active={route().current("gradecalculator")}>
              Grade calculator
            </ResponsiveNavLink>
          </div>

          <div className="border-t border-gray-200 pb-1 pt-4">
            <div className="px-4">
              <div className="text-base font-medium ">{user.name}</div>
              <div className="text-sm font-medium ">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route("logout")} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-neutral shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {header ? (
            <h2 className="text-xl font-semibold leading-tight ">{header}</h2>
          ) : (
            <h2 className="text-xl font-semibold leading-tight ">{title}</h2>
          )}
        </div>
      </header>

      <main className="felx justify-start flex-grow m-2 px-8 relativ min-h-[74dvh] md:px-40 overflow-clip">
        {children}
      </main>

      <Footer />
    </div>
  );
}
