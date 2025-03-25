
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface MeditationTrack {
  id: string;
  title: string;
  duration: string;
  category: string;
}

const sampleTracks: MeditationTrack[] = [
  { id: '1', title: 'Calm Mind Meditation', duration: '10:00', category: 'Stress Relief' },
  { id: '2', title: 'Anxiety Reduction', duration: '15:00', category: 'Anxiety' },
  { id: '3', title: 'Deep Sleep Journey', duration: '20:00', category: 'Sleep' },
  { id: '4', title: 'Morning Energy Boost', duration: '5:00', category: 'Energy' },
  { id: '5', title: 'Gratitude Practice', duration: '8:00', category: 'Positivity' },
];

const MeditationPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MeditationTrack>(sampleTracks[0]);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current as NodeJS.Timeout);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTrackChange = (track: MeditationTrack) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handlePrevious = () => {
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sampleTracks.length - 1;
    handleTrackChange(sampleTracks[prevIndex]);
  };
  
  const handleNext = () => {
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = currentIndex < sampleTracks.length - 1 ? currentIndex + 1 : 0;
    handleTrackChange(sampleTracks[nextIndex]);
  };
  
  // Format time to display with leading zeros
  const formatTimeWithLeadingZeros = (time: number): string => {
    return time.toString().padStart(2, '0');
  };
  
  // Calculate current minutes and seconds for display
  const calculateCurrentTime = () => {
    const totalSeconds = progress / 100 * parseFloat(currentTrack.duration.replace(':', '.')) * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${formatTimeWithLeadingZeros(minutes)}:${formatTimeWithLeadingZeros(seconds)}`;
  };
  
  return (
    <div className="rounded-xl shadow-sm border border-border overflow-hidden bg-card relative">
      {/* Visualizer background */}
      <div className="h-48 bg-gradient-to-r from-mindwave-50 to-harmony-50 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-40 h-40 rounded-full bg-mindwave-100 ${isPlaying ? 'animate-breathe' : ''} flex items-center justify-center z-10`}>
            <div className={`w-28 h-28 rounded-full bg-mindwave-200 ${isPlaying ? 'animate-breathe' : ''} flex items-center justify-center`} style={{ animationDelay: '0.5s' }}>
              <div className={`w-16 h-16 rounded-full bg-mindwave-300 ${isPlaying ? 'animate-breathe' : ''} flex items-center justify-center`} style={{ animationDelay: '1s' }}>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Player controls */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-medium">{currentTrack.title}</h3>
          <p className="text-sm text-muted-foreground">{currentTrack.category}</p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-mindwave-500 rounded-full transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>
              {calculateCurrentTime()}
            </span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handlePrevious}
          >
            <SkipBack className="h-5 w-5" />
          </button>
          
          <button 
            className="p-4 rounded-full bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handleNext}
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center">
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors mr-2"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : volume < 50 ? (
              <Volume1 className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${isMuted ? 0 : volume}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`,
            }}
          />
        </div>
      </div>
      
      {/* Track list */}
      <div className="border-t border-border p-6">
        <h4 className="font-medium mb-4">Recommended Sessions</h4>
        <div className="space-y-2">
          {sampleTracks.map((track) => (
            <div 
              key={track.id}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                currentTrack.id === track.id
                  ? 'bg-mindwave-50 border border-mindwave-200'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleTrackChange(track)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="font-medium text-sm">{track.title}</h5>
                  <p className="text-xs text-muted-foreground">{track.category}</p>
                </div>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditationPlayer;
