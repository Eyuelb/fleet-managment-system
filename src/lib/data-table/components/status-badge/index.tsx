import React from "react";

interface BadgeData {
  label: string;
  value: string;
  color: string;
}

interface Props {
  value: string;
  data: BadgeData[];
}

const StatusBadge: React.FC<Props> = ({ value, data }) => {
  // Find the object in the data array that matches the value
  const badgeData = data.find((item) => item.value === value);

  // If badgeData is found, extract the label, otherwise default to the value itself
  const badgeLabel = badgeData ? badgeData.label : value;

  // If badgeData is found, extract the color, otherwise default to 'gray'
  const badgeColor = badgeData ? badgeData.color : "gray";

  return (
    <div
      className="flex items-center rounded-xl py-1"
      style={{
        width:'70px',
        fontSize: "11px",
        backgroundColor: badgeColor,
        color: "white",
      }}
    >
        <p className="w-full text-center">
        {badgeLabel}

        </p>
    </div>
  );
};

export default StatusBadge;
