import React from 'react';
import { Play, CheckCircle, Clock, FileVideo } from 'lucide-react';
import { cn } from '../utils/cn';

export function Playlist({ playlist, currentVideo, onVideoSelect, progress }) {
    if (playlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-premium-muted p-8 text-center border border-dashed border-premium-gray/30 rounded-xl bg-premium-dark/20">
                <FileVideo className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium">Playlist is empty</p>
                <p className="text-xs mt-2 opacity-50">Drop a .m3u file to start watching</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-premium-dark/30 rounded-xl border border-premium-gray/20 overflow-hidden">
            <div className="p-4 border-b border-premium-gray/20 bg-premium-black/50 backdrop-blur-sm sticky top-0 z-10">
                <h2 className="text-lg font-bold text-premium-text flex items-center justify-between">
                    <span>Playlist</span>
                    <span className="text-xs font-normal px-2 py-1 bg-premium-gray/50 rounded-full text-premium-muted">
                        {playlist.length} videos
                    </span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {playlist.map((video, index) => {
                    const vidProgress = progress[video.id] || { currentTime: 0, duration: 0, completed: false };
                    const percent = vidProgress.duration > 0
                        ? (vidProgress.currentTime / vidProgress.duration) * 100
                        : 0;
                    const isActive = currentVideo?.id === video.id;

                    return (
                        <div
                            key={video.id}
                            onClick={() => onVideoSelect(video)}
                            className={cn(
                                "group relative p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-premium-gray/40",
                                isActive ? "bg-premium-gray/60 border-premium-accent/20 shadow-lg" : "bg-transparent"
                            )}
                        >
                            <div className="flex items-start gap-3 z-10 relative">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5",
                                    isActive ? "bg-premium-accent text-white shadow-glow" : "bg-premium-dark text-premium-muted group-hover:text-premium-text"
                                )}>
                                    {isActive ? <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> : <span className="text-xs font-medium font-mono">{index + 1}</span>}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className={cn(
                                        "font-medium text-sm truncate transition-colors leading-tight mb-1",
                                        isActive ? "text-premium-accent" : "text-premium-text group-hover:text-white"
                                    )}>
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-premium-muted">
                                        <div className="flex items-center gap-2">
                                            {video.duration > 0 && (
                                                <span className="flex items-center gap-1 opacity-70">
                                                    <Clock className="w-3 h-3" />
                                                    {Math.floor(video.duration / 60)}:{String(Math.floor(video.duration % 60)).padStart(2, '0')}
                                                </span>
                                            )}
                                        </div>
                                        {vidProgress.completed && (
                                            <span className="flex items-center gap-1 text-green-500 font-medium bg-green-500/10 px-1.5 py-0.5 rounded text-[10px]">
                                                <CheckCircle className="w-3 h-3" />
                                                Watched
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent rounded-b-lg overflow-hidden mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-300",
                                        vidProgress.completed ? "bg-green-500" : "bg-premium-accent"
                                    )}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            {/* Active Progress Bar (Always visible) */}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-premium-dark/50 rounded-b-lg overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full transition-all duration-300",
                                            vidProgress.completed ? "bg-green-500" : "bg-premium-accent"
                                        )}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
