import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function EventGenre({ events }) {
  const [data, setData] = useState([]);

  function getData() {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => {
        return event.summary.split(' ').includes(genre);
      }).length;
      return { name: genre, value };
    });
    return data;
  }

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const colors = ['#2c3e50', '#27ae60', '#f39c12', '#808080', '#3498db'];

  return (
    <>
      <h4>Popular event genres</h4>
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={getData()}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) => {
              if (percent > 0) {
                return `${name} ${(percent * 100).toFixed(0)}%`;
              } else {
                return null;
              }
            }}
            outerRadius={80}
            dataKey="value"
          >
            {getData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export { EventGenre };
