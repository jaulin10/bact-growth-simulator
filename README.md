# Bacteria Growth Simulate

An interactive bacterial growth simulation application, developed in React and TypeScript, without external libraries.

---

##  Table of Contents

1. [Overview](#overview-overview)
1. [Features](#features-features)
1. [Prerequisites](#prerequisites-prerequisites)
1. [Installation & Run](#installation-and-run-installation--run)
1. [Project Structure](#project-structure-project-structure)
1. [Component Description](#component-description-components)
1. [Data Model](#data-model-data-model)
1. [Core Logic](#core-logic-core-logic)
1. [User Controls](#user-controls ... Controls)](#user-controls-user-controls)
1. [Error Handling](#error-handling-error-handling)
1. [Performance](#performance-performance)
1. [Assumptions](#assumptions-assumptions)
1. [Deployment](#deployment-deployment)
1. [Future Improvements](#future-improvements-future-improvements)
1. [License](#license-license)

---

##  1. Overview

**Cell Growth Simulation** is a web-based simulator that models the growth of a bacterial colony in a grid (representing a Petri dish). Each cell can be empty or contain a bacterium that:

- divides at regular intervals,
- undergoes a random mutation during division,
- ages and dies after a certain lifespan.

The user can start, pause, and reset the simulation and adjust:

- the division interval,
- the mutation probability,
- the lifespan of the bacteria,
- manually add/remove bacteria by clicking.

---

##  2. Features

- **Interactive grid** 50x50 (configurable)
- **Start/Pause/Reset** the simulation
- **Adjustable division interval** (ms)
- **Adjustable mutation probability** (%)
- **Adjustable life span** (ms)
- **Manual click** to add/remove bacteria
- **Visual mutation** (purple color)
- **Visual aging** (light green → dark green)
- **Smooth animation** (CSS transition)
- **Error handling** on inputs

---

##  3. Prerequisites

- **Node.js** ≥ 16
- **npm** or **yarn**
- Modern browser (Chrome, Firefox, Edge)

---

##  4. Installation and Run (Install & Run)

```bash
# 1. Clone the repository
git clone https://github.com/jaulin10/bact-growth-simulation.git
cd cell-growth-simulation

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run in development mode
npm start
# or
yarn start

# 4. Open http://localhost:3000

#5>>>>>>>>>>>>> # Project Structure <<<<<<<<<<<<

Bact-growth-simulation/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Grid.tsx
│   │   └── Controls.tsx
│   ├── types/
│   │   └── Types.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── .gitignore
├── package.json
└── README.md


>>>>>>>>>>>>> Components Description <<<<<<<<<<<<<

App.tsx
Overall status :
grid, tick, isRunning, intervalTime,
mutationProb, lifespan, isIntervalValid

Hooks :

useEffect to manage the tick interval

Rendering :

<Controls />

<Grid />

Controls.tsx
Props :
isRunning, onStartPause, onReset,
interval, onIntervalChange, isIntervalValid,
mutationProb, setMutationProb, lifespan, setLifespan

Display :

Buttons Start/Break, Reset

Inputs for interval, mutationProb, lifespan

Live interval validation

Grid.tsx
Props :
grid, setGrid, tick, mutationProb, lifespan

Hook useEffect :

Aging (cell.age += TICK_INTERVAL)

Mort si age ≥ lifespan

Division into an empty neighbor (mutationProb)

getBacteriaColor :

null → blanc

mutated → violet

ageRatio → nuance de vert

toggleCell :

Clic to add/remove a bacteria

Types.ts
export type EmptyCell = null;

export type BacteriaCell = {
  type: "bacteria";
  age: number;
  lifespan: number;
  mutated: boolean;
};

export type CellState = EmptyCell | BacteriaCell;


#7. >>>>>>>>>>>>> Data Model <<<<<<<<<<<<<
Grid: CellState[][]

CellState:

null (empty)

{ type: "bacteria"; age: number; lifespan: number; mutated: boolean }

#8  >>>>>>>>>>>>> Core Logic <<<<<<<<<<<<<
Tick incremented every intervalTime ms →

Aging: cell.age += TICK_INTERVAL

Death: if age ≥ lifespan → cell is null

Division: new bacteria in an empty neighbor

Mutation: Math.random() < mutationProb

#9.  >>>>>>>>>>>>> User Controls <<<<<<<<<<<<<
Start/Pause: starts/stops the simulation

Reset: empty grid + tick = 0

Interval: ms between divisions (min 1)

Mutation (%): 0–100% → probability 0–1

Lifespan: lifespan in ms (min 1000)

#10 >>>>>>>>>>>>> Error Handling <<<<<<<<<<<<< 
Interval: validated > 0 → Start button disabled + red message

Mutation / Lifespan:

Constrained mutation 0–100%

Constrained lifespan ≥ 1000 ms

Clicking outside the grid is not possible

#11 >>>>>>>>>>>>>  Performance <<<<<<<<<<<<< 
50x50 grid in dev, can be scaled up to 200x200 in production

O(n²) complexity per tick

Optimizations: Web Workers, Canvas, grid partitioning

#12 >>>>>>>>>>>>>  Assumptions <<<<<<<<<<<<< 
Square grid, fixed size

Synchronous division + aging

Simple Boolean mutation

Maximum one division per tick

#13 >>>>>>>>>>>>>   Deployment <<<<<<<<<<<<<
 Vercel / GitHub Pages: https://bact-growth-simulator.vercel.app/

npm run build

Deploy build/

Public URL via HTTPS : 

#14  >>>>>>>>>>>>>   Future Improvements <<<<<<<<<<<<<
Real-time graphics

Canvas/WebGL for large grids

Web Workers for asynchronous computation

State saving/loading

Additional sound effects/animations

#15.>>>>>>>>>>>>>   License <<<<<<<<<<<<<
This project is licensed under the MIT License.
See LICENSE for details.

Author: Jaulin Nanfack
Date: 2025-04-27
