import { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 20;

export default function SnakeGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    onScoreUpdate(0);
  }, [onScoreUpdate]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || newSnake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        setScore(s => {
          const newScore = s + 10;
          onScoreUpdate(newScore);
          return newScore;
        });
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    }, 150);

    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver, onScoreUpdate]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction.y === 0) setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y === 0) setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x === 0) setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x === 0) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  return (
    <div className="bg-black border-2 border-cyan-500 p-1 relative overflow-hidden">
      <div className="grid border-r border-b border-cyan-900" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div key={i} className={`w-4 h-4 border-l border-t border-cyan-900 ${isSnake ? "bg-cyan-500" : isFood ? "bg-magenta-500" : "bg-black"}`} />
          );
        })}
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-magenta-500 gap-4 font-mono">
          <p className="text-2xl font-bold glitch uppercase">Game Over</p>
          <button onClick={resetGame} className="border-2 border-cyan-500 px-6 py-2">RESTART</button>
        </div>
      )}
    </div>
  );
}
