import React from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./daily-paid.css";

export const DailyPaid = ({ base }) => {
  return (
    <div className="DailyPaid">
      <h1 className="Charts__title">
        Buyurtmalar va to'lovlar vaqtlar taqsimida!
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="others_paid"
            fill="#8884d8"
            activeBar={<Rectangle fill="black" stroke="black" />}
          />
          <Bar
            dataKey="orders"
            fill="#ffff00"
            activeBar={<Rectangle fill="black" stroke="black" />}
          />
          <Bar
            dataKey="todays_paid"
            fill="#7bc043"
            activeBar={<Rectangle fill="black" stroke="black" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
