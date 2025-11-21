import React, { useRef, useEffect } from 'react';
import { cn } from '../utils/cn';

export function VideoPlayer({ video, onTimeUpdate, onEnded, savedTime, theme }) {
    const videoRef = useRef(null);

    // Restore saved time when video changes
    useEffect(() => {
        if (videoRef.current && savedTime > 0) {
            videoRef.current.currentTime = savedTime;
        }
    }, [video?.id]);

    // Autoplay when video changes
    useEffect(() => {
        if (videoRef.current && video) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
        }
    }, [video]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if user is typing in an input (though none exist yet, good practice)
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            // Ignore if no video is loaded
            if (!videoRef.current || !video) return;

            const v = videoRef.current;

            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    v.paused ? v.play() : v.pause();
                    break;
                case 'f':
                    e.preventDefault();
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        v.requestFullscreen();
                    }
                    break;
                case 'm':
                    e.preventDefault();
                    v.muted = !v.muted;
                    break;
                case 'arrowleft':
                case 'j':
                    e.preventDefault();
                    v.currentTime = Math.max(0, v.currentTime - 10);
                    break;
                case 'arrowright':
                case 'l':
                    e.preventDefault();
                    v.currentTime = Math.min(v.duration, v.currentTime + 10);
                    break;
                case 'arrowup':
                    e.preventDefault();
                    v.volume = Math.min(1, v.volume + 0.1);
                    break;
                case 'arrowdown':
                    e.preventDefault();
                    v.volume = Math.max(0, v.volume - 0.1);
                    break;
                default:
                    // Handle 0-9 keys for seeking
                    if (e.key >= '0' && e.key <= '9') {
                        e.preventDefault();
                        const percent = parseInt(e.key) * 10;
                        if (v.duration) {
                            v.currentTime = (v.duration * percent) / 100;
                        }
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [video]);

    if (!video) {
        return (
            <div className="w-full aspect-video bg-premium-dark rounded-xl flex flex-col items-center justify-center text-premium-muted border border-premium-gray shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-premium-gray/50 flex items-center justify-center mb-4">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-premium-muted border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                <p className="font-medium">Select a video from the playlist</p>
            </div>
        );
    }

    const isDarkTheme = theme !== 'light';

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
            <video
                ref={videoRef}
                src={video.url}
                controls
                className={cn(
                    "w-full h-full object-contain transition-all duration-500",
                    isDarkTheme && "invert hue-rotate-180"
                )}
                style={isDarkTheme ? { filter: 'invert(1)' } : {}}
                onTimeUpdate={(e) => onTimeUpdate(e.target.currentTime, e.target.duration)}
                onEnded={onEnded}
            />
        </div>
    );
}
