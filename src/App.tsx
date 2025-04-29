import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { CellState } from "./Types";
import Chart from "./Chart";

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000);
  const [tick, setTick] = useState(0); // Used to force grid update
  const [mutationProb, setMutationProb] = useState(0.1);
  const [lifespan, setLifespan] = useState(6000);
  const [isIntervalValid, setIsIntervalValid] = useState(true);
  const [history, setHistory] = useState<number[]>([]);
  const [showFullHistory, setShowFullHistory] = useState(false);
  //const [data, setData] = useState<number[]>([0, 2, 4, 6, 8, 6, 4, 2, 0]);

  const GRID_SIZE = 50;

  // Function to create an empty grid
  const createEmptyGrid = (): CellState[][] =>
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => null)
    );

  const [grid, setGrid] = useState<CellState[][]>(createEmptyGrid());

  // Update the simulation every tick
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTick((prev) => {
          // Counts bacteria and updates history
          const count = grid
            .flat()
            .filter((cell) => cell?.type === "bacteria").length;
          setHistory((prevHistory) => [...prevHistory, count]);
          return prev + 1;
        });
      }, intervalTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, intervalTime, grid]);

  // Manage simulation stop/start
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset the simulation
  const handleReset = () => {
    setIsRunning(false);
    setTick(0);
    setGrid(createEmptyGrid());
    setHistory([]);
  };

  // Show/hide full history
  const toggleShowHistory = () => {
    setShowFullHistory((prev) => !prev);
  };

  // Manage interval change
  const handleIntervalChange = (value: number) => {
    setIntervalTime(value);
    setIsIntervalValid(value > 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bacteria Growth Simulate</h1>
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
      <h2>Population growth</h2>
      <Chart
        data={history}
        width={500}
        height={200}
        color="green"
        showFull={showFullHistory}
      />
      <div style={{ marginBottom: "10px" }}>
        <button onClick={toggleShowHistory}>
          {showFullHistory ? "Show reduced view" : "Show all history"}
        </button>
      </div>
    </div>
  );
};

export default App;
