import React from "react";

const ActivityHistory = ({ history }) => {
  return (
    <div className="history">
      <h2>Recent Activities</h2>
      {history.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <strong>{item.duration}</strong> at {item.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityHistory;
