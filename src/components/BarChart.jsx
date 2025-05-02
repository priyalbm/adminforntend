import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";


const Barchart = ({barData}) => {
  const data = [
    { name: "Mon", value: 150 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 450 },
    { name: "Thurs", value: 250 },
    { name: "Fri", value: 180 },
    { name: "Sat", value: 400 },
    { name: "Sun", value: 120 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart
        data={barData}
        barSize={25}
        barCategoryGap={30}
        margin={{ left: 0, right: 0, top: -20, bottom: -10 }}
      >
        <XAxis
          dataKey="date"
          stroke="#626262"
          axisLine={true}
          tick={{ fontSize: 10, fill: "#626262" }}
          tickLine={false}
          padding={{ left: 0, right: 0 }}
        />
        <YAxis
          stroke="transparent"
          tick={{ fontSize: 10, fill: "#626262" }}
          domain={[0, 500]}
          tickCount={6}
          interval={0}
          width={35}
        />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar dataKey="total" radius={[20, 20, 20, 20]}>
          {barData?.map((entry, index) => (
            <Cell key={index} fill="#017BEC" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
