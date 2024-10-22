import React from "react";

type StatCardProps = {
  name: string;
  value: string | number;
  change: number;
  changeType: string;
};

const StatCard: React.FC<StatCardProps> = ({
  name,
  value,
  change,
  changeType,
}) => {
  return (
    <div className=" p-4 rounded-md  bg-on-dark-full shadow-md  text-on-dark">
      <div className="text-gray-500 dark:stat-title">{name}</div>
      <div className="stat-value">{value}</div>
      <div
        className={`stat-desc ${
          changeType === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {changeType === "up" ? "↑" : "↓"} {change}%
      </div>
    </div>
  );
};

export default StatCard;
