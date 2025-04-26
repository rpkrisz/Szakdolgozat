import {Link, Outlet} from "react-router-dom";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";

function GuestLayout() {
  return (
    <>
      <header className="flex justify-center items-center">
        <Link to="/hero">
          <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
        </Link>
      </header>
      <main className="flex flex-grow justify-center items-center relative m-0 px-8 relativ md:px-40 overflow-clip">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default GuestLayout;
