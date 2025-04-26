import {FC} from "react";
import {Link} from "react-router-dom";
import ApplicationLogo from "@/components/ApplicationLogo";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import {useLogout} from "@/services";

const Hero: FC = () => {
  const isAuth = useIsAuthenticated();
  const {mutate: logOut} = useLogout();

  return (
    <div className="bg-neutral text-neutral-content">
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl  min-h-screen">
          <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
            <div className="flex lg:col-start-2 lg:justify-center">
              <ApplicationLogo className="size-24 fill-current text-gray-500" />
            </div>
            <nav className="-mx-3 flex flex-1 justify-end">
              {isAuth ? (
                <div className="flex gap-2">
                  <Link to={"/home"} className="btn btn-outline">
                    Home
                  </Link>
                  <button onClick={() => logOut()} className="btn btn-outline">
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to={"/login"} state={window.location.href} className="btn btn-outline">
                    Log in
                  </Link>
                  <Link to={"/register"} className="btn btn-outline">
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </header>
          <main className="felx justify-start flex-grow overflow-clip ">
            <div className="hero bg-neutral text-neutral-content shadow-sm sm:rounded-lg">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="/assets/vertical-logo.png" className="max-w-sm p-5 rounded-lg shadow-2xl" />
                <div>
                  <h1 className="text-3xl font-bold">Stay on top of your university workload!</h1>
                  <div className=" flex flex-col gap-0 py-6 max-w-lg">
                    <p className="py-1">
                      Welcome to your personal task tracker. This is your one-stop shop for managing all your university
                      assignments, projects, and deadlines.
                    </p>
                    <p className="py-1">
                      Welcome to your personal task tracker. This is your one-stop shop for managing all your university
                      assignments, projects, and deadlines.
                    </p>
                    <p className="py-1"> Let's conquer your to-do list together! </p>
                  </div>
                  {!isAuth && (
                    <div className="flex gap-5 items-center">
                      <Link to={"/register"} className="btn btn-primary">
                        Register now!
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
