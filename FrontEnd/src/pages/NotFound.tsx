import {FC} from "react";
import {Link} from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const NotFound: FC = () => {
  const isAuth = useIsAuthenticated();

  return (
    <div className="bg-neutral text-neutral-content text-black/50  dark:text-white/50">
      <div className="relative flex flex-col items-center justify-center selection:text-white">
        <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl  min-h-screen">
          <header className="felx justify-center items-center">
            <div className="flex justify-center">
              <ApplicationLogo className="size-24 fill-current text-gray-500" />
            </div>
          </header>
          <main className="felx justify-start flex-grow overflow-clip ">
            <div className="hero bg-neutral text-neutral-content shadow-sm sm:rounded-lg">
              <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <img src="/assets/vertical-logo.png" className="max-w-sm p-5 rounded-lg shadow-2xl" />
                <div className="flex flex-col justify-center lg:justify-start gap-10 m-20">
                  <div className="font-bold text-center">
                    <h1 className="text-9xl">404</h1>
                    <h1 className="text-4xl">Page not found!</h1>
                  </div>
                  <div className="flex gap-5 justify-center items-center">
                    <Link
                      to={isAuth ? "/home" : "/hero"}
                      className="bg-primary text-primary-content rounded-md px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Get back to the app!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
