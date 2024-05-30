// src/PieChartComponent.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Accepted', value: 400 },
  { name: 'Wrong Answer', value: 300 },
  { name: 'Compilation Error', value: 200 }
];

const COLORS = ['#7ed56f', '#FF8042', '#FFBB28'];

function Piegraph() {
  return (
    <PieChart  width={400} height={400} margin={{ top:20 ,right:0}}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default Piegraph;
