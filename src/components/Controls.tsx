import React from "react";

type ControlsProps = {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  interval: number;
  onIntervalChange: (value: number) => void;
  isIntervalValid: boolean;
  mutationProb: number;
  setMutationProb: (v: number) => void;
  lifespan: number;
  setLifespan: (v: number) => void;
};

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStartPause,
  onReset,
  interval,
  onIntervalChange,
  isIntervalValid,
  mutationProb,
  setMutationProb,
  lifespan,
  setLifespan,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={onStartPause} disabled={!isIntervalValid}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={onReset} style={{ marginLeft: "10px" }}>
        Reset
      </button>

      <label style={{ marginLeft: "20px" }}>
        Division Interval (ms):{" "}
        <input
          type="number"
          value={interval}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
          min={1}
        />
      </label>
      {!isIntervalValid && (
        <div style={{ color: "red", fontSize: "12px", marginLeft: "20px" }}>
          Interval must be greater than 0 ms.
        </div>
      )}

      <label style={{ marginLeft: "20px" }}>
        Mutation Probability (%):{" "}
        <input
          type="number"
          value={mutationProb * 100}
          onChange={(e) => {
            const pct = Number(e.target.value);
            if (pct >= 0 && pct <= 100) setMutationProb(pct / 100);
          }}
          min={0}
          max={100}
        />
      </label>

      <label style={{ marginLeft: "20px" }}>
        Lifespan (ms):{" "}
        <input
          type="number"
          value={lifespan}
          onChange={(e) => setLifespan(Number(e.target.value))}
          min={1000}
        />
      </label>
    </div>
  );
};

export default Controls;
