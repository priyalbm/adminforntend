import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const COLORS = ["#2ABD2A", "#fff"];
const COLORS_INACTIVE = ["#FF0000", "#fff"];

const DonutChart = ({ data, colors, label }) => {
  console.log(data);
  
  return (
    <div style={{ width: "180px", flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ResponsiveContainer className="donut_box" width="100%" height={180}>
        <PieChart className="donut_inner">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={54}
            outerRadius={76}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="donut_data" style={{ textAlign: "start", width: "100%" }}>
        <p style={{ color: "#626262", fontSize: "16px", fontWeight: "600", margin: "5px 0 0 0" }}>
          {label}
        </p>
        <p style={{ color: "#fff", fontSize: "20px", fontWeight: "600", margin: "5px 0 0 0" }}>
          {data?.[0]?.value}
        </p>
      </div>
    </div>
  );
};

const Dashboard = ({active,inactive}) => {
  const activeData = [{ name: "Active", value: active }, { name: "Remaining", value: 25 }];
  const inactiveData = [{ name: "Inactive", value: inactive }, { name: "Remaining", value: 75 }];

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
      <DonutChart data={activeData} colors={COLORS} label="Total Bot Active" />
      <DonutChart data={inactiveData} colors={COLORS_INACTIVE} label="Total Bot Inactive" />  
    </div>
  );
};

export default Dashboard;
