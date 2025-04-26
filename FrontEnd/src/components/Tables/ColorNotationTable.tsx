import {FC} from "react";
import ToolTip from "../ToolTip";

const ColorNotationTable: FC = () => {
  return (
    <table className="table text-base-content bg-base-300 my-2">
      <thead className="flex justify-center text-base-content text-lg">
        <tr>
          <th>Color code</th>
        </tr>
      </thead>
      <tbody>
        <tr className="flex flex-wrap justify-center items-center gap-1 p-2">
          <td className="assaigment">
            <ToolTip text="This type of task is an assaigment.">assaigment</ToolTip>
          </td>
          <td className="midterm">
            <ToolTip text="This type of task is an midterm or exam.">midterm or exam</ToolTip>
          </td>
          <td className="inprogress">
            <ToolTip text="This type of task is in progress.">handed out, in progress</ToolTip>
          </td>
          <td className="relevant">
            <ToolTip text="This type of task has a due date in the near future.">now / in a week</ToolTip>
          </td>
          <td className="done">
            <ToolTip text="This type of task is done, and waiting for evaluation.">done</ToolTip>
          </td>
          <td className="graded">
            <ToolTip text="This type of task is evaluated and graded.">finished, graded</ToolTip>
          </td>
          <td className="missed">
            <ToolTip text="This type of task is missed passed the due date, or faild.">missed, faild</ToolTip>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ColorNotationTable;
