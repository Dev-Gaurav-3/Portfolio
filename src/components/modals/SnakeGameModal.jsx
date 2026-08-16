import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw, Trophy, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIR = { x: 0, y: -1 };

export default function SnakeGameModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [dir, setDir] = useState(INITIAL_DIR);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const dirRef = useRef(dir);
  dirRef.current = dir;

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }

      if (isPaused || gameOver) return;

      const currentDir = dirRef.current;
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (currentDir.y !== 1) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (currentDir.y !== -1) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (currentDir.x !== 1) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (currentDir.x !== -1) setDir({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, gameOver]);

  // Game loop ticker
  useEffect(() => {
    if (isPaused || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y,
        };

        // Wall collision check
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Self collision check
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food check
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snake_high_score', newScore.toString());
            }
            return newScore;
          });
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 130);

    return () => clearInterval(interval);
  }, [isPaused, gameOver, food, highScore]);

  const generateFood = (currentSnake) => {
    let newX, newY;
    while (true) {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
      if (!currentSnake.some((s) => s.x === newX && s.y === newY)) break;
    }
    setFood({ x: newX, y: newY });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPaused(true);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDir(INITIAL_DIR);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0f19] border border-[#ff6b0044] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#ff6b0020] flex flex-col items-center">
        
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-[#1f2438]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ff6b0020] text-[#ff8800] border border-[#ff6b0033]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Playable Retro Snake Game</h3>
              <p className="text-xs text-slate-400">Custom Game Loop & Canvas Logic by Gaurav Suryavanshi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://dev-gaurav-3.github.io/Snake-Game/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-xs font-semibold text-[#ffa033] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Live Site</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#07080e] text-slate-400 hover:text-white hover:border-[#ff6b00] border border-[#1f2438]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scoreboard Bar */}
        <div className="w-full flex items-center justify-between py-3 px-4 my-4 rounded-xl bg-[#07080e] border border-[#1f2438] font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Score:</span>
            <span className="text-xl font-bold text-[#ff8800]">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">High Score:</span>
            <span className="text-xl font-bold text-amber-400">{highScore}</span>
          </div>
        </div>

        {/* Game Screen Container */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-[#07080e] border-2 border-[#ff6b0044] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Grid Render */}
          <div
            className="w-full h-full grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);

              const isHead = snake[0].x === x && snake[0].y === y;
              const isSnakeSegment = snake.some((s) => s.x === x && s.y === y);
              const isFoodSegment = food.x === x && food.y === y;

              let cellStyle = 'bg-transparent';
              if (isHead) {
                cellStyle = 'bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-sm shadow-md shadow-[#ff6b0088]';
              } else if (isSnakeSegment) {
                cellStyle = 'bg-[#ff6b00aa] rounded-sm';
              } else if (isFoodSegment) {
                cellStyle = 'bg-emerald-400 rounded-full animate-pulse shadow-md shadow-emerald-400';
              }

              return (
                <div key={i} className={`w-full h-full ${cellStyle}`} />
              );
            })}
          </div>

          {/* Overlay Screens */}
          {(isPaused || gameOver) && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-4">
              {gameOver ? (
                <>
                  <div className="text-2xl font-black text-rose-500 tracking-wider">GAME OVER</div>
                  <p className="text-xs text-slate-300">Final Score: <span className="text-[#ff8800] font-bold">{score}</span></p>
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-lg shadow-[#ff6b0040]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-white">Press Play to Start Snake</div>
                  <p className="text-xs text-slate-400">Use WASD or Arrow Keys to navigate</p>
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-lg shadow-[#ff6b0040]"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Start Game</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* On-screen Mobile D-Pad Controls */}
        <div className="mt-4 flex flex-col items-center gap-1.5 sm:hidden">
          <button
            onClick={() => dir.y !== 1 && setDir({ x: 0, y: -1 })}
            className="p-3 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-[#ff8800] active:bg-[#ff6b0033]"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => dir.x !== 1 && setDir({ x: -1, y: 0 })}
              className="p-3 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-[#ff8800] active:bg-[#ff6b0033]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => dir.x !== -1 && setDir({ x: 1, y: 0 })}
              className="p-3 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-[#ff8800] active:bg-[#ff6b0033]"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => dir.y !== -1 && setDir({ x: 0, y: 1 })}
            className="p-3 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-[#ff8800] active:bg-[#ff6b0033]"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
