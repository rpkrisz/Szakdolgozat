import { chartData } from "@/types";
import {FC} from "react";
import {PieChart, Pie, Cell} from "recharts";

const RADIAN = Math.PI / 180;
const data = [
  {name: "A", value: 1, color: "#ac3e31"},
  {name: "B", value: 2, color: "#dbae59"},
  {name: "C", value: 2, color: "#6bb187"},
];
const cx = 125;
const cy = 95;
const iR = 50;
const oR = 80;

const needle = (value: number, data: chartData[], cx: number, cy: number, iR: number, oR: number, color: string) => {
  let total = 0;
  data.forEach(v => {
    total += v.value;
  });

  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key={color} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const GradeChart: FC<{grade: number}> = grade => {
  return (
    <div className="flexr justify-center items-center">
      <PieChart width={250} height={100}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map(entry => (
            <Cell key={`cell-${entry.color}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(grade.grade, data, cx, cy, iR, oR, "darkbrown")}
      </PieChart>
    </div>
  );
};

export default GradeChart;
