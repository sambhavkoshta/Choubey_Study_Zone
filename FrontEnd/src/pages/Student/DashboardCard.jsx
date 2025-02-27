import React from "react";

const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{count}</p>
    </div>
  );
};

export default DashboardCard;
