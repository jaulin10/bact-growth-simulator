import React, { useEffect } from "react";
import { CellState } from "../types/Types";

interface GridProps {
  grid: CellState[][];
  setGrid: React.Dispatch<React.SetStateAction<CellState[][]>>;
  tick: number;
  mutationProb: number;
  lifespan: number;
}

const GRID_SIZE = 50;

const Grid: React.FC<GridProps> = ({
  grid,
  setGrid,
  tick,
  mutationProb,
  lifespan,
}) => {
  const TICK_INTERVAL = 1000;

  const getBacteriaColor = (cell: CellState | null) => {
    if (!cell) return "white"; // If ever cell is null, returns white
    if (cell.mutated) return "purple";

    const ageRatio = Math.min(cell.age / cell.lifespan, 1);
    const greenLevel = Math.floor(255 - 155 * ageRatio);

    return `rgb(0, ${greenLevel}, 0)`;
  };

  useEffect(() => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cell = prevGrid[i][j];

          if (!cell || cell.type !== "bacteria") continue;

          // Update age
          cell.age += TICK_INTERVAL;

          // If cell has exceeded lifespan, it dies
          if (cell.age >= cell.lifespan) {
            newGrid[i][j] = null;
            continue;
          }

          // Attempt to divide into adjacent cells
          const directions = [
            [i - 1, j],
            [i + 1, j],
            [i, j - 1],
            [i, j + 1],
          ];

          for (const [x, y] of directions) {
            if (
              x >= 0 &&
              x < GRID_SIZE &&
              y >= 0 &&
              y < GRID_SIZE &&
              newGrid[x][y] === null
            ) {
              newGrid[x][y] = {
                type: "bacteria",
                age: 0,
                lifespan: lifespan, // User defined lifespan
                mutated: Math.random() < mutationProb, // User defined mutation probability
              };
              break;
            }
          }
        }
      }

      return newGrid;
    });
  }, [tick, setGrid, mutationProb, lifespan]);

  const toggleCell = (i: number, j: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      const current = newGrid[i][j];
      newGrid[i][j] =
        current && current.type === "bacteria"
          ? null
          : {
              type: "bacteria",
              age: 0,
              lifespan: lifespan,
              mutated: Math.random() < mutationProb,
            };
      return newGrid;
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 12px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 12px)`,
        gap: "1px",
        border: "1px solid #ccc",
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => toggleCell(i, j)}
            style={{
              width: "12px",
              height: "12px",
              backgroundColor:
                cell?.type === "bacteria" ? getBacteriaColor(cell) : "white",
              //transform:
              //cell?.type === "bacteria"
              //   ? `scale(${1 + Math.min(cell.age / cell.lifespan, 0.3)})`
              //   : "scale(1)",
              // transition: "transform 0.5s, background-color 0.5s",
              border: "1px solid #eee",
              cursor: "pointer",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
