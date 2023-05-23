import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent > 0) {
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  } else {
    return null;
  }
};

class EventGenre extends Component {
  getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const data = genres.map((genre) => {
      const value = this.props.events.filter((event) => {
        // .some() has to be added, so .includes() is not run on the array (returning only exact matches) but on every single array element
        return event.summary.split(' ').some((summaryWord) => {
          return summaryWord.includes(genre);
        });
      }).length;
      return { name: genre, value };
    });
    return data;
  };

  render() {
    const colors = ['#2c3e50', '#27ae60', '#f39c12', '#808080', '#3498db'];

    return (
      <ResponsiveContainer className="eventGenre" height={300}>
        <PieChart>
          <Legend />
          <Pie
            data={this.getData()}
            outerRadius={100}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {this.getData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export { EventGenre };
