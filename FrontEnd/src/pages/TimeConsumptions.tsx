import {breadcrumbsRoutes, titleAtom} from "@/store/atoms";
import {useSetAtom} from "jotai/react";
import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useGetSemester, useGetSemesterSubjects, useGetUniversityNames} from "@/services";
import {max, mean, min, round} from "lodash";
import {median, mode} from "@/utils/";
import {ResponsiveContainer, PieChart, Pie, Cell, PieLabel} from "recharts";

const COLORS = [
  "#00FFFF",
  "#FF8C00",
  "#FF69B4",
  "#32CD32",
  "#00FFFF",
  "#FFA500",
  "#FF00FF",
  "#2ECC71",
  "#00BFFF",
  "#FF2400",
];

const TimeConsumptions: FC = () => {
  const {universityID, semesterID} = useParams();

  const [semester] = useGetSemester(semesterID!);
  const [subjects] = useGetSemesterSubjects(semesterID!);
  const [universitiyNames] = useGetUniversityNames(universityID!);

  const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
    if (!semester || !semester.name || !universitiyNames) return;
    setTitle(universitiyNames.nickName + " " + semester.name! + " Time Consumptions");
  });

  const setRoutes = useSetAtom(breadcrumbsRoutes);
  useEffect(() => {
    setRoutes([
      {to: "/home", name: "Home"},
      {to: `/universities/${universityID}`, name: "University"},
      {to: `/semesters/${universityID}/${semesterID}`, name: "Semester"},
    ]);
  }, [setRoutes, universityID, semesterID]);

  const weeklyTimeConsumptions = subjects.map(subject => subject.weeklyTimeConsumption);
  const sumTime = weeklyTimeConsumptions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const RADIAN = Math.PI / 180;
  const customizedLabel: PieLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, payload}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={COLORS[payload.id % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm text-wrap bg-slate-50"
      >
        {`${payload.name} - ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:grid-rows-6 gap-4">
      <table className="table col-span-2 text-center">
        <thead className="bg-primary text-primary-content">
          <tr>
            <th>Avg</th>
            <th>Minimum</th>
            <th>Maximum</th>
            <th>Median</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mean(weeklyTimeConsumptions)}</td>
            <td>{min(weeklyTimeConsumptions)}</td>
            <td>{max(weeklyTimeConsumptions)}</td>
            <td>{median(weeklyTimeConsumptions)}</td>
            <td>{mode(weeklyTimeConsumptions)}</td>
          </tr>
        </tbody>
      </table>
      <div className="lg:row-span-5 lg:col-start-2 lg:row-start-2 text-base-content">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              isAnimationActive={false}
              data={subjects}
              dataKey="weeklyTimeConsumption"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#82ca9d"
              label={customizedLabel}
            >
              {subjects.map(entry => (
                <Cell key={`cell-${entry.id}`} fill={COLORS[entry.id % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:row-span-5 lg:col-start-1 lg:row-start-2 place-content-center flex flex-col gap-10">
        <table className="table text-center">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Minutes</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            <tr>
              <td>{sumTime} m</td>
              <td>{round(sumTime / 60, 2)} h</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-zebra">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Subject</th>
              <th className="text-center">Consumption in Minutes</th>
              <th className="text-center">Consumption in Hours</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => {
              return (
                <tr key={subject.id}>
                  <th>{subject.name}</th>
                  <td className="text-center">{subject.weeklyTimeConsumption} m</td>
                  <td className="text-center">{round(subject.weeklyTimeConsumption / 60, 2)} h</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeConsumptions;
