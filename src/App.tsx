/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import SnakeGame from "./components/SnakeGame";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-8 flex flex-col items-center gap-8 font-mono">
      <h1 className="text-3xl font-extrabold text-magenta-500 glitch uppercase tracking-widest">
        Neon Beats
      </h1>
      
      <div className="text-xl text-cyan-300">SCORE: {score}</div>

      <div className="relative border-4 border-cyan-500 p-2 shadow-[0_0_20px_#06b6d4]">
        <SnakeGame onScoreUpdate={setScore} />
      </div>

      <MusicPlayer />
    </div>
  );
}
