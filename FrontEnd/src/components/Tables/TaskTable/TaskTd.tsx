import {FC} from "react";
import {Task} from "@/types";
import {Edit, Trash2} from "lucide-react";
import {editTaskAtom, viewTaskAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {runStyleConditions, openModal} from "@/utils/";
import {modalNames} from "@/components/Modals";
import {useDeleteTask} from "@/services";

const TaskTd: FC<{task: Task}> = ({task}) => {
  const {name, dueDate, stage} = task;
  const style = runStyleConditions(task);
  const setEditTask = useSetAtom(editTaskAtom);
  const setViewTask = useSetAtom(viewTaskAtom);
  const [deleteTask] = useDeleteTask();

  const editTask = () => {
    openModal(modalNames.EditTaskModal);
    setEditTask(task);
  };

  const viewTask = () => {
    openModal(modalNames.TaskViewModal);
    setViewTask(task);
  };

  return (
    <td className={`${stage} ${style} taskTdBase cursor-pointer`}>
      <div className="flex-grow" onClick={viewTask}>
        <p className="overflow-clip">{name}</p>
        <p>{new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric"}).format(new Date(dueDate))}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <Edit className="cursor-pointer" onClick={editTask} />
        <Trash2
          className="cursor-pointer"
          onClick={() => {
            if (!window.confirm(`Are you sure, you want to delete ${task.name} task?`)) return;
            deleteTask(task.id);
          }}
        />
      </div>
    </td>
  );
};

export default TaskTd;
