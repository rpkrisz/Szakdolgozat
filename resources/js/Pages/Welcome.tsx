import ApplicationLogo from "@/Components/ApplicationLogo";
import GuestLayout from "@/Layouts/GuestLayout";
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";

function Welcome({auth, laravelVersion, phpVersion}: PageProps<{laravelVersion: string; phpVersion: string}>) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };

  return (
    <>
      <Head title="Welcome" />
      <div className="bg-neutral text-black/50  dark:text-white/50">
        <div className="relative flex flex-col items-center justify-center selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl  min-h-screen">
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:col-start-2 lg:justify-center">
                <ApplicationLogo className="size-24 fill-current text-gray-500" />
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route("register")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </header>

            <main className="felx justify-start flex-grow overflow-clip ">
              <div className="hero bg-neutral shadow-sm sm:rounded-lg">
                <div className="hero-content flex-col lg:flex-row-reverse">
                  <img src="/assets/vertical-logo.png" className="max-w-sm p-5 rounded-lg shadow-2xl" />
                  <div>
                    <h1 className="text-3xl font-bold">Stay on top of your university workload!</h1>
                    <div className=" flex flex-col gap-0 py-6 max-w-lg">
                      <p className="py-1">
                        Welcome to your personal task tracker. This is your one-stop shop for managing all your
                        university assignments, projects, and deadlines.
                      </p>
                      <p className="py-1">
                        Welcome to your personal task tracker. This is your one-stop shop for managing all your
                        university assignments, projects, and deadlines.
                      </p>
                      <p className="py-1"> Let's conquer your To Do List together! </p>
                    </div>
                    <Link href={route("register")} className="btn btn-primary">
                      Register now!
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

Welcome.layout = (page: JSX.Element) => <>{page}</>;
export default Welcome;
