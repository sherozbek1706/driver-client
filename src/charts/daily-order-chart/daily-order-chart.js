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
import "./daily-order-chart.css";

export const Daily_order_charts = ({ base }) => {
  return (
    <div className="DailyOrder">
      <h1 className="Charts__title">
        Buyurtmalarning kelib tushishi vaqtlar taqsimida!
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
          {/* <Line type="monotone" dataKey="id" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
