import React from 'react';

const BanList = ({ banList, removeBan }) => {
  return (
    <div className="banlist-section">
      <h2>Ban List</h2>
      <div className="banlist-container">
        {banList.map((item, index) => (
          <div key={index} className="ban-item" onClick={() => removeBan(item)}>
            <span>{item}</span>
            <span className="remove-icon">×</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BanList;