import {viewTaskAtom} from "@/store/atoms";
import {useAtom} from "jotai/react";
import {BarChart3Icon, CalendarIcon, CircleX, LinkIcon, ScaleIcon} from "lucide-react";
import {FC} from "react";
import {modalNames} from ".";
import ToolTip from "../ToolTip";

const TaskViewModal: FC = () => {
  const [task] = useAtom(viewTaskAtom);

  let stage = 0;
  let stageColor = "";
  switch (task?.stage) {
    case "inprogress":
      stage = 1;
      stageColor = "progress-info";
      break;
    case "done":
      stage = 2;
      stageColor = "progress-warning";
      break;
    case "graded":
      stage = 3;
      stageColor = "progress-success";
      break;
    case "faild":
      stage = 3;
      stageColor = "progress-error";
      break;
    default:
      break;
  }

  return (
    <>
      <dialog id={modalNames.TaskViewModal} className="modal">
        <div className="modal-box p-0 rounded-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <CircleX />
            </button>
          </form>
          <div className="flex justify-between items-center border-b border-primary p-6">
            <h2 className="text-xl font-semibold">{task?.name}</h2>
          </div>
          <div className="p-6">
            <ToolTip
              className="col-span-2 col-start-1 row-start-2 flex justify-center"
              text={`Task stage: ${task?.stage}`}
              color="tooltip-primary"
            >
              <progress className={`progress ${stageColor} w-56 my-3`} value={stage} max="3"></progress>
            </ToolTip>
            <div className="mb-6 mt-3">
              <p>{task?.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-start-1 md:row-start-1 flex items-center gap-2">
                <CalendarIcon size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Due Date</p>
                  <p className="font-medium">{task?.dueDate}</p>
                </div>
              </div>
              <div className="md:col-start-1 md:row-start-2 flex items-center gap-2">
                <span className="w-[18px] h-[18px] rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-400">
                  T
                </span>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-medium">{task?.type}</p>
                </div>
              </div>
              <div className="md:col-start-2 md:row-start-1 flex items-center gap-2">
                <BarChart3Icon size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Score</p>
                  <p className="font-medium">{task?.score}</p>
                </div>
              </div>
              <div className="md:col-start-2 md:row-start-2 flex items-center gap-2">
                <ScaleIcon size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Weight</p>
                  <p className="font-medium">{task?.weight}</p>
                </div>
              </div>
            </div>
            {task?.taskPage && (
              <div className="mt-6 pt-4 border-t border-primary ">
                <div className="flex items-center gap-2">
                  <LinkIcon size={18} className="text-gray-500" />
                  <a
                    href={task.taskPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View task's page
                  </a>
                </div>
              </div>
            )}
          </div>
          <form method="dialog" className="flex justify-end px-6 py-4 bg-neutral text-neutral-content">
            <button className="btn rounded-sm">Close</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TaskViewModal;
