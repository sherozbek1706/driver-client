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
import "./daily-payment.css";

export const DailyPayment = ({ base }) => {
  return (
    <div className="DailyPayment">
      <h1 className="Charts__title">
        Har kunlik haydovchilarga o'tkaziladigan mablag'lar!
      </h1>
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
          <XAxis dataKey="kun" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="O'tkazmalar soni"
            stroke="#ff0000"
            strokeWidth={2}
            activeDot={{ r: 4 }}
            fill="#ffff00"
          />
          <Area
            type="monotone"
            dataKey="Pul miqdori"
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
