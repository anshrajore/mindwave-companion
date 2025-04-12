import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, SkipBack, SkipForward, Wind } from 'lucide-react';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';

interface MeditationTrack {
  id: string;
  title: string;
  duration: string;
  category: string;
}

const sampleTracks: MeditationTrack[] = [
  { id: '1', title: 'Calm Mind Meditation', duration: '60:00', category: 'Stress Relief' },
  { id: '2', title: 'Anxiety Reduction', duration: '150:00', category: 'Anxiety' },
  { id: '3', title: 'Deep Sleep Journey', duration: '200:00', category: 'Sleep' },
  { id: '4', title: 'Morning Energy Boost', duration: '500:00', category: 'Energy' },
  { id: '5', title: 'Gratitude Practice', duration: '800:00', category: 'Positivity' },
];

const MeditationPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MeditationTrack>(sampleTracks[0]);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [mode, setMode] = useState<'meditation' | 'breathing'>('meditation');
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const breathingInterval = useRef<NodeJS.Timeout | null>(null);

  const onPlayerReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (player) {
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volume);
      }
    }
  }, [volume, isMuted, player]);

  useEffect(() => {
    if (mode === 'meditation') {
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
    } else {
      if (isPlaying) {
        setBreathingPhase('Inhale');
        breathingInterval.current = setInterval(() => {
          setBreathingPhase((prev) => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
        }, 4000);
      } else if (breathingInterval.current) {
        clearInterval(breathingInterval.current);
      }

      return () => {
        if (breathingInterval.current) clearInterval(breathingInterval.current);
      };
    }
  }, [isPlaying, mode]);

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
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

  const formatTimeWithLeadingZeros = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  const calculateCurrentTime = () => {
    const totalSeconds = progress / 100 * parseFloat(currentTrack.duration.replace(':', '.')) * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${formatTimeWithLeadingZeros(minutes)}:${formatTimeWithLeadingZeros(seconds)}`;
  };

  const toggleMode = () => {
    setProgress(0);
    setMode((prev) => (prev === 'meditation' ? 'breathing' : 'meditation'));
  };

  return (
    <div className="rounded-xl shadow-sm border border-border overflow-hidden bg-card relative">
      <div className="h-[300px] w-full bg-black flex items-center justify-center relative">
        <YouTube
          videoId="mZPd8owe1Oc"
          opts={{
            height: '300',
            width: '100%',
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          }}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          className="absolute top-0 left-0 w-full h-full"
          style={{ visibility: mode === 'breathing' ? 'hidden' : 'visible' }}
        />
        {mode === 'breathing' && (
          <div className="text-white text-3xl font-semibold animate-pulse transition-all duration-1000 z-10">
            {breathingPhase}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium">
              {mode === 'meditation' ? 'Relaxing Meditation Music' : 'Breathing Exercise Mode'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {mode === 'meditation' ? 'Deep Focus & Concentration' : 'Follow the breathing pattern'}
            </p>
          </div>
          <button
            onClick={toggleMode}
            className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-muted rounded-full hover:bg-muted/70"
          >
            <Wind className="w-4 h-4" />
            {mode === 'meditation' ? 'Switch to Breathing' : 'Switch to Meditation'}
          </button>
        </div>

        {mode === 'meditation' && (
          <div className="mb-6">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-mindwave-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{calculateCurrentTime()}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button
            className="p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handlePrevious}
            title="Previous track"
            aria-label="Previous track"
            disabled={mode === 'breathing'}
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            className="p-4 rounded-full bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>

          <button
            className="p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handleNext}
            title="Next track"
            aria-label="Next track"
            disabled={mode === 'breathing'}
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center">
          <button
            className="p-2 rounded-full hover:bg-muted transition-colors mr-2"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : volume < 50 ? <Volume1 className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
            title="Volume control"
            aria-label="Volume control"
            style={{
              backgroundImage: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${isMuted ? 0 : volume}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MeditationPlayer;
