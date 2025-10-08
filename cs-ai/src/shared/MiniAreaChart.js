import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  {x: 'Mon', y: 10}, {x: 'Tue', y: 14}, {x: 'Wed', y: 18}, {x: 'Thu', y: 12}, {x: 'Fri', y: 20},
];

export default function MiniAreaChart(){
  return (
    <div style={{ width: '100%', height: 80 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <Area type="monotone" dataKey="y" stroke="#2563eb" fill="#bfdbfe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
