# React Game of Life

## What is Conway's Game of Life?

Conway's Game of Life is a cellular automaton devised by mathematician John Conway. It consists of a grid of cells, each of which can be alive or dead. The game evolves in discrete steps, with the state of each cell determined by a set of simple rules based on its neighbors:

1. **Survival:** A living cell with 2 or 3 living neighbors stays alive.
2. **Death:** A living cell with fewer than 2 or more than 3 living neighbors dies (underpopulation or overpopulation).
3. **Birth:** A dead cell with exactly 3 living neighbors becomes alive.

The Game of Life is famous for its ability to produce complex patterns and behaviors from these simple rules.

## Implementation in This Project

This project implements Conway's Game of Life using React and TypeScript. The main features and implementation details include:

- **Interactive Grid:** The grid is rendered as a table of cells. Users can click cells to toggle their state (alive/dead).
- **Simulation Logic:** The game logic is implemented in React components, updating the grid state according to Conway's rules on each tick.
- **Adjustable Speed:** Users can control the speed of the simulation.
- **Start/Stop & Reset:** Controls allow users to start, pause, and reset the simulation.
- **Responsive UI:** The interface is styled for usability and clarity.

### How It Works

1. The grid is initialized with all cells dead or with a random pattern.
2. When the simulation starts, the grid updates at a set interval, applying the Game of Life rules to each cell.
3. Users can interact with the grid at any time, toggling cell states or adjusting simulation speed.
4. The simulation can be paused or reset to experiment with different patterns.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Interactive grid
- Adjustable speed
- Start/stop simulation
- Reset grid

## License

This project is licensed under the MIT License.
