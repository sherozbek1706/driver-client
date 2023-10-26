import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import "./daily-work.css";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const DailyWork = ({ base }) => {
  return (
    <div className="DailyWork">
      <h1 className="DailyWork_Charts__title">
        {lotinKirilOtkazish("Bugungi buyurtmalar bilan ishlagan grafigingiz!")}
      </h1>
      <ResponsiveContainer width="110%" height="100%">
        <LineChart
          width={700}
          height={800}
          data={base}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="miqdor"
            stroke="#ffff00"
            strokeWidth={4}
            activeDot={{ r: 4, fill: "red" }}
          />
          {/* <Line type="monotone" dataKey="id" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
