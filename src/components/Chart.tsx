import React from "react";

interface ChartProps {
  data: number[];
  width: number;
  height: number;
  color?: string;
  showFull?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  data,
  width,
  height,
  color = "green",
  showFull = false,
}) => {
  const max = Math.max(...data, 1);
  const displayData = showFull ? data : data.slice(-Math.floor(width / 5)); // Show only the last visible points

  const points = displayData
    .map((value, index) => {
      const x = (index / (displayData.length - 1 || 1)) * width;
      const y = height - (value / max) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      style={{ background: "#f0fff0", border: "1px solid #ccc" }}
    >
      {/* Zone verte */}
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill="lightgreen"
        stroke="none"
      />

      {/* Courbe */}
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} />

      {/* Points */}
      {displayData.map((value, index) => {
        const x = (index / (displayData.length - 1 || 1)) * width;
        const y = height - (value / max) * height;
        return <circle key={index} cx={x} cy={y} r={2} fill={color} />;
      })}

      {/* Axes */}
      <line
        x1="0"
        y1={height}
        x2={width}
        y2={height}
        stroke="black"
        strokeWidth={1}
      />
      <line x1="0" y1="0" x2="0" y2={height} stroke="black" strokeWidth={1} />

      {/* Graduation sur Y */}
      {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
        const y = height - ratio * height;
        return (
          <g key={idx}>
            <line
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="#ccc"
              strokeDasharray="4"
            />
            <text x="5" y={y - 2} fontSize="10" fill="black">
              {Math.round(ratio * max)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default Chart;
