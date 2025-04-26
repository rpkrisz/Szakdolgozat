import {FC, useEffect, useState} from "react";
import {DateInput, NumberInput, SelectInput, TextArea, TextInput} from "@/components/Inputs";
import {
  cancelModalForm,
  closeModal,
  handleModalFormChange,
  handleModelNumberChange,
  handleTextAreaChange,
} from "@/utils/";
import {entries} from "lodash";
import {useAtom} from "jotai/react";
import {editTaskAtom, taskEditToggel} from "@/store/atoms";
import {modalNames} from ".";
import {useUpdateTask} from "@/services";
import {toast} from "react-toastify";

const EditTaskModal: FC = () => {
  const [task, setEditTask] = useAtom(editTaskAtom);
  const [form, setForm] = useState({...task!});
  const [toggel, setToggel] = useAtom(taskEditToggel);
  const [updateTask] = useUpdateTask();

  useEffect(() => {
    setForm({...task!});
  }, [task]);

  const update = async () => {
    if (
      entries(form).some(([key, value]) => {
        if (["name", "dueDate", "type", "stage"].includes(key)) return !value;
        return false;
      })
    )
      return toast.error("Some fields are missing!");
    try {
      updateTask(form);
    } catch (error) {
      toast.error("Task update faild!");
    }

    setForm({...form});
    setEditTask(undefined);
    closeModal(modalNames.EditTaskModal);
    setToggel(!toggel);
  };

  return (
    <dialog id={modalNames.EditTaskModal} className="modal modal-bottom sm:modal-middle" open={!!task}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit {task?.name}!</h3>
        <div className="flex flex-col">
          <TextInput
            label="Name"
            name="name"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.name}
            required={true}
          />
          <DateInput
            label="Due date"
            name="dueDate"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.dueDate}
            required={true}
          />
          <NumberInput
            label="Weight"
            name="weight"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.weight}
            required={true}
          />
          <TextInput
            label="Task page"
            name="taskPage"
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.taskPage}
            required={true}
          />
          <SelectInput
            label="Type"
            name="type"
            options={[
              {value: "midterm", text: "Midterm"},
              {value: "quiz", text: "Quiz"},
              {value: "assignment", text: "Assignment"},
              {value: "exam", text: "Exam"},
              {value: "homework", text: "Homework"},
              {value: "bonus_points", text: "Bonus Points"},
            ]}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.type}
            required={true}
          />
          <NumberInput
            label="Score"
            name="score"
            handleChange={e => handleModelNumberChange(e, form, setForm)}
            inputData={form.score}
            required={true}
          />
          <SelectInput
            label="Task stage"
            name="stage"
            options={[
              {value: "inprogress", text: "In progress"},
              {value: "done", text: "Done"},
              {value: "graded", text: "Graded"},
              {value: "faild", text: "Faild"},
            ]}
            handleChange={e => handleModalFormChange(e, form, setForm)}
            inputData={form.stage}
            required={true}
          />
          <TextArea
            label="Description"
            name="description"
            handleChange={e => handleTextAreaChange(e, form, setForm)}
            inputData={form.description}
            required={true}
          />
        </div>
        <div className="flex justify-end gap-2 p-2 modal-backdrop">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditTask(undefined);
              cancelModalForm(form, setForm, modalNames.EditTaskModal);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-accent" onClick={update}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
