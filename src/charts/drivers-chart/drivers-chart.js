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
import "./drivers-chart.css";

export const Drivers_chart = ({ base }) => {
  return (
    <div className="DriverCharts">
      <h1 className="Charts__title">
        Haydovchilarni buyurtmalarni qabul qilish diagrammasi!
      </h1>
      <ResponsiveContainer width="90%" height="100%">
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
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            strokeWidth={4}
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="id" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
