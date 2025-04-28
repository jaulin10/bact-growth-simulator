import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { CellState } from "./Types";
import { clear } from "console";

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000);
  const [tick, setTick] = useState(0); // This is to force grid update
  const [mutationProb, setMutationProb] = useState(0.1);
  const [lifespan, setLifespan] = useState(6000);
  const [isIntervalValid, setIsIntervalValid] = useState(true);

  const GRID_SIZE = 50;

  const createEmptyGrid = (): CellState[][] =>
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => null)
    );

  const [grid, setGrid] = useState<CellState[][]>(createEmptyGrid());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTick((prev) => prev + 1); // Tick will notify Grid to update
      }, intervalTime);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, intervalTime]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTick(0);
    setGrid(createEmptyGrid());
  };

  const handleIntervalChange = (value: number) => {
    setIntervalTime(value);
    setIsIntervalValid(value > 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bacterie Growth Simulate </h1>
      <Controls
        isRunning={isRunning}
        onStartPause={handleStartPause}
        onReset={handleReset}
        interval={intervalTime}
        onIntervalChange={handleIntervalChange}
        isIntervalValid={isIntervalValid}
        mutationProb={mutationProb}
        setMutationProb={setMutationProb}
        lifespan={lifespan}
        setLifespan={setLifespan}
      />
      <Grid
        grid={grid}
        setGrid={setGrid}
        tick={tick}
        mutationProb={mutationProb}
        lifespan={lifespan}
      />
    </div>
  );
};

export default App;
