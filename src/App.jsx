import React from 'react';
import { Layout } from './components/Layout';
import { DropZone } from './components/DropZone';
import { VideoPlayer } from './components/VideoPlayer';
import { Playlist } from './components/Playlist';
import { usePlayerState } from './hooks/usePlayerState';

function App() {
  const {
    playlist,
    setPlaylist,
    currentVideo,
    playVideo,
    progress,
    updateProgress,

    theme,
    setTheme,
  } = usePlayerState();

  const handlePlaylistLoaded = (newPlaylist) => {
    setPlaylist(newPlaylist);
    // Optional: Auto-play first video if none selected
    if (newPlaylist.length > 0 && !currentVideo) {
      playVideo(newPlaylist[0]);
    }
  };

  const handleVideoEnded = () => {
    if (!currentVideo) return;

    // Mark current as completed (ensure 100%)
    // We pass duration as both current and total to signify completion
    // But updateProgress expects (currentTime, duration)
    // We rely on the hook's logic to mark as completed if > 95%
    // But here we can force it by passing full duration
    // Actually, the hook logic: isCompleted = duration > 0 && (currentTime / duration) > 0.95
    // So passing duration, duration works.
    // But we need to know the duration.
    // The onEnded event doesn't pass duration directly, but we can get it from the video element if we had ref.
    // But here we don't have ref.
    // However, VideoPlayer calls onTimeUpdate with duration.
    // So we likely have the duration in state already.
    // Let's just rely on the last onTimeUpdate or the user clicking next.

    // Auto play next
    const currentIndex = playlist.findIndex(v => v.id === currentVideo.id);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      playVideo(playlist[currentIndex + 1]);
    }
  };

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Sidebar: DropZone + Playlist */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full overflow-hidden">
          <DropZone
            onPlaylistLoaded={handlePlaylistLoaded}
            className="shrink-0"
          />
          <Playlist
            playlist={playlist}
            currentVideo={currentVideo}
            onVideoSelect={playVideo}
            progress={progress}
          />
        </div>

        {/* Main Content: Video Player */}
        <div className="lg:col-span-2 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <VideoPlayer
            video={currentVideo}
            savedTime={currentVideo ? progress[currentVideo.id]?.currentTime || 0 : 0}
            onTimeUpdate={(time, duration) => {
              if (currentVideo) {
                updateProgress(currentVideo.id, time, duration);
              }
            }}
            onEnded={handleVideoEnded}
            theme={theme}
          />

          {/* Video Info */}
          {currentVideo ? (
            <div className="mt-6 p-6 rounded-2xl bg-premium-dark/30 border border-premium-gray/20 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-bold text-premium-text tracking-tight">{currentVideo.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-premium-muted text-sm">
                <span className="px-2 py-1 rounded bg-premium-gray/50 border border-premium-gray/30">
                  Video
                </span>
                {currentVideo.duration > 0 && (
                  <span>{Math.floor(currentVideo.duration / 60)}:{String(Math.floor(currentVideo.duration % 60)).padStart(2, '0')}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 p-6 rounded-2xl bg-premium-dark/10 border border-premium-gray/10 border-dashed flex items-center justify-center text-premium-muted/50">
              <p>Video details will appear here</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
