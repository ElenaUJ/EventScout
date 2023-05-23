import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
          <Pie
            data={this.getData()}
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
