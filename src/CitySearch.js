import React from 'react';

function CitySearch() {
  return (
    <div className="CitySearch">
      <input type="text" className="city" />
      <ul className="suggestions"></ul>
    </div>
  );
}

export { CitySearch };
