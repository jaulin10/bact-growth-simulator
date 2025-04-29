export type EmptyCell = null;

export type BacteriaCell = {
  type: "bacteria";
  age: number;
  lifespan: number;
  mutated: boolean;
};

export type CellState = EmptyCell | BacteriaCell;
