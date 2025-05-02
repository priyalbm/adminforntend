import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";


const DashboardChart = ({botdata}) => {
  const data = [
    { name: botdata?.[0]?.exchange__name, value: botdata?.[0]?.count, fill: "#F75E47" },
    { name: botdata?.[1]?.exchange__name, value: botdata?.[1]?.count, fill: "#18AD8B" },
    { name: botdata?.[2]?.exchange__name, value: botdata?.[2]?.count, fill: "#017BEC" },
  ];
  console.log(data);
  
const CustomLegend = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "-10px",
      }}
    >
      {data.map((entry, index) => (
        <div key={index} style={{ textAlign: "center", flex: "1" }}>
          <div
            className="pie_content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "66px",
                backgroundColor: entry.fill,
                borderRadius: "3px",
              }}
            ></div>
            <div>
              <p
                style={{
                  color: "#626262",
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {entry.name}
              </p>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "10px 0 0 0",
                  color: "#fff",
                }}
              >
                {entry.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

  return (
    <div
      className="pie_data"
      style={{
        width: "100%",
        height: "522px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        padding: "0px",
      }}
    >
      <div style={{ width: "100%", height: "85%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="90%"
            barSize={22}
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <RadialBar
              minAngle={15}
              clockWise
              dataKey="value"
              background={{ fill: "rgb(255 255 255 / 8%)" }}
              cornerRadius={20}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  );
};

export default DashboardChart;
