import {FC} from "react";
import {Task} from "../models/Task";

const EditIcons: FC<{task: Task}> = ({task}) => {
  const id = task.id;
  const state = task.state;

  return (
    <div className="editIcons" hidden>
      <a href="../editors/delete/deleteTask.php?id={id}" className="deleteicon">
        <img src="../delete_icon.png" alt={id} />
      </a>
      <a href="../editors/edit/editTask.php?task_id={id}" className="settingicon">
        <img src="../setting_icon.png" alt="" />
      </a>
      {state === "done"
        ? "<img src='../check-mark_icon.png' alt='' class='checkingicon'>"
        : "<img src='../cancel_icon.png' alt='' class='checkingicon'>"}
    </div>
  );
};

export default EditIcons;
