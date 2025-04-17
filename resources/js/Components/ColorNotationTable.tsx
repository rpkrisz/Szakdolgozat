import {FC} from "react";

const ColorNotationTable: FC = () => {
  return (
    <table className="table my-2 ">
      <thead className="flex justify-center">
        <th>Color code</th>
      </thead>
      <tbody>
        <tr className="flex flex-wrap justify-center items-center gap-1">
          <td className="assaigment ">assaigment</td>
          <td className="midterm ">midterm or exam</td>
          <td className="inprogress ">handed out, inprogress</td>
          <td className="relevant ">now / in a week</td>
          <td className="done ">done</td>
          <td className="graded ">finished, graded</td>
          <td className="missed ">missed, faild</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ColorNotationTable;
