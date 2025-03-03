import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {titleAtom} from "@/store/atoms";
import {Head} from "@inertiajs/react";
import {useSetAtom} from "jotai/react";

export default function Dashboard() {
  const setTitle = useSetAtom(titleAtom);
  setTitle("Dashboard");

  return (
    <>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-neutral shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in NOW!</div>
          </div>
        </div>
      </div>
    </>
  );
}
