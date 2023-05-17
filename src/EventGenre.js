import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

class EventGenre extends Component {
  getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = this.props.events.filter((event) => {
        return event.summary.split(' ').includes(genre);
      }).length;
      return { name: genre, value };
    });
    return data;
  };

  render() {
    const colors = ['#2c3e50', '#27ae60', '#f39c12', '#808080', '#3498db'];

    return (
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={this.getData()}
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
