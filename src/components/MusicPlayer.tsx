import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { TRACKS } from "../constants";

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const skipNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  
  const skipPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="bg-black border-2 border-magenta-500 p-6 rounded-none shadow-[0_0_15px_#d946ef] text-cyan-400 font-mono w-full max-w-sm">
      <audio ref={audioRef} src={TRACKS[currentTrackIndex].url} />
      <h2 className="text-lg font-bold text-magenta-400 mb-1 uppercase tracking-tighter">
        {TRACKS[currentTrackIndex].title}
      </h2>
      <p className="text-cyan-600 mb-4 text-xs">{TRACKS[currentTrackIndex].artist}</p>
      <div className="flex justify-between items-center gap-4">
        <button className="text-magenta-500 hover:text-white" onClick={skipPrev}><SkipBack /></button>
        <button onClick={togglePlay} className="text-black bg-magenta-500 p-3 rounded-none hover:bg-magenta-400">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className="text-magenta-500 hover:text-white" onClick={skipNext}><SkipForward /></button>
      </div>
    </div>
  );
}
