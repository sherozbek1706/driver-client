import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./new-drivers-chart.css";

export const New_Driver_charts = ({ base }) => {
  return (
    <div className="NewDriverCharts">
      <h1 className="Charts__title">
        Haydovchilarni ro'yxatga olish qaysi kunda qancha!
      </h1>
      {/* <ResponsiveContainer width="90%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={base}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              fontWeight: "500",
              textShadow: "0px 2px 20px rgba(0,0,0,0.5)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="length"
            stroke="#ffff00"
            strokeWidth={4}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="id" stroke="#82ca9d" /> 
        </LineChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="90%" height="90%">
        <AreaChart
          width={500}
          height={300}
          data={base}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="length"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 4 }}
            fill="#051e3e"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
