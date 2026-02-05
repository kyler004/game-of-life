import React, { useState, useCallback, useRef, useEffect } from "react";

const App: React.FC = () => {
  const numRows = 50;
  const numCols = 70;
  const cellSize = 12;

   const [grid, setGrid] = useState<number[][]>(() => 
    Array(numRows).fill(null).map(() => Array(numCols).fill(0))
  );

  const [running, setRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(100);
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [rainbow, setRainbow] = useState<boolean>(false);

  const runningRef = useRef<boolean>(running);
  runningRef.current = running;

  const speedRef = useRef<number>(speed);
  speedRef.current = speed;

  // Neighbor positions
  const operations: number[][] = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];
  // Logic

  const runSimulation = useCallback(() => {
    
  })
  return <div>App</div>;
};

export default App;
