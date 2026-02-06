import React, { useState, useCallback, useRef, useEffect } from 'react';
import {Dices, Trash2, Palette, Play, StepForward} from 'lucide-react'

const GameOfLife: React.FC = () => {
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
    [0, 1], [0, -1], [1, -1], [-1, 1],
    [1, 1], [-1, -1], [1, 0], [-1, 0]
  ];

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(g => {
      const newGrid = g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ] ? 1 : 0;
            }
          });

          // Conway's rules
          if (cell) {
            return neighbors === 2 || neighbors === 3 ? cell : 0;
          } else {
            return neighbors === 3 ? (g[i][j] || Math.floor(Math.random() * 360)) : 0;
          }
        })
      );
      return newGrid;
    });
    
    setGeneration(gen => gen + 1);
    setTimeout(runSimulation, speedRef.current);
  }, []);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running, runSimulation]);

  const toggleCell = (i: number, j: number): void => {
    const newGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        if (rowIdx === i && colIdx === j) {
          return cell ? 0 : Math.floor(Math.random() * 360);
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handleMouseDown = (i: number, j: number): void => {
    setDrawMode(true);
    toggleCell(i, j);
  };

  const handleMouseEnter = (i: number, j: number): void => {
    if (drawMode) {
      toggleCell(i, j);
    }
  };

  const handleMouseUp = (): void => {
    setDrawMode(false);
  };

  const randomize = (): void => {
    const newGrid = Array(numRows).fill(null).map(() =>
      Array(numCols).fill(null).map(() => 
        Math.random() > 0.7 ? Math.floor(Math.random() * 360) : 0
      )
    );
    setGrid(newGrid);
    setGeneration(0);
  };

  const clear = (): void => {
    setGrid(Array(numRows).fill(null).map(() => Array(numCols).fill(0)));
    setGeneration(0);
  };

  const step = (): void => {
    if (!running) {
      setGrid(g => {
        const newGrid = g.map((row, i) =>
          row.map((cell, j) => {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ] ? 1 : 0;
              }
            });

            if (cell) {
              return neighbors === 2 || neighbors === 3 ? cell : 0;
            } else {
              return neighbors === 3 ? Math.floor(Math.random() * 360) : 0;
            }
          })
        );
        return newGrid;
      });
      setGeneration(gen => gen + 1);
    }
  };

  const getCellColor = (cell: number): string => {
    if (!cell) return 'rgb(20, 20, 30)';
    if (rainbow) {
      return `hsl(${cell}, 70%, 60%)`;
    }
    return 'rgb(100, 200, 255)';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-500 via-slate-900 to-gray-900 p-8">
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mb-2">
          Conway's Game of Life
        </h1>
        <p className="text-cyan-300 text-lg">Generation: {generation}</p>
      </div>

      <div 
        className="mb-6 rounded-lg shadow-2xl p-2"
        style={{ 
          background: 'linear-gradient(135deg, rgba(100,100,150,0.3), rgba(50,50,100,0.3))',
          backdropFilter: 'blur(10px)'
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
            gap: '1px',
            background: 'rgb(10, 10, 20)',
            padding: '1px',
            borderRadius: '8px'
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseEnter={() => handleMouseEnter(i, j)}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: getCellColor(col),
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  boxShadow: col ? '0 0 8px rgba(100, 200, 255, 0.5)' : 'none'
                }}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center items-center mb-4">
        <button
          onClick={() => setRunning(!running)}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg"
          style={{
            background: running 
              ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
              : 'linear-gradient(135deg, #10b981, #059669)',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {running ? '⏸ Pause' : '▶ Start'}
        </button>

        <button
          onClick={step}
          disabled={running}
          className=" flex px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          }}
          onMouseEnter={(e) => !running && (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <StepForward size={20}/> Step
        </button>

        <button
          onClick={randomize}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg flex"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Dices size={20}/> Random
        </button>

        <button
          onClick={clear}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg flex"
          style={{
            background: 'linear-gradient(135deg, #64748b, #475569)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Trash2 size={20}/> Clear
        </button>

        <button
          onClick={() => setRainbow(!rainbow)}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg"
          style={{
            background: rainbow 
              ? 'linear-gradient(135deg, #ec4899, #f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6)' 
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {rainbow ? '🌈 Rainbow' : '🎨 Color'}
        </button>
      </div>

      <div className="flex items-center gap-4 bg-gray-800/50 px-6 py-3 rounded-lg backdrop-blur">
        <label className="text-cyan-300 font-semibold">Speed:</label>
        <input
          type="range"
          min="10"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-purple-300 font-mono">{speed}ms</span>
      </div>

      <div className="mt-6 text-center text-cyan-300/70 text-sm max-w-2xl">
        <p>Click or drag to draw cells • Watch patterns emerge and evolve</p>
        <p className="mt-1">Rules: Birth (3) • Survival (2-3) • Death (0-1, 4+)</p>
      </div>
    </div>
  );
};

export default GameOfLife;