import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history-section">
      <h2>History</h2>
      <div className="history-list">
        {history.map((hero, index) => (
          <div key={index} className="history-item">
            <img 
              src={hero.image.url} 
              alt={hero.name} 
              className="history-image" 
            />
            <p className="history-name">{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;