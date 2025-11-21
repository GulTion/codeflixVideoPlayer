import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
    PLAYLIST: 'codeflix_playlist',
    PROGRESS: 'codeflix_progress',
    LAST_PLAYED: 'codeflix_last_played',
    DARK_MODE: 'codeflix_dark_mode',
};

export function usePlayerState() {
    // Playlist State
    const [playlist, setPlaylist] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.PLAYLIST);
        return saved ? JSON.parse(saved) : [];
    });

    // Current Video State
    const [currentVideo, setCurrentVideo] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.LAST_PLAYED);
        return saved ? JSON.parse(saved) : null;
    });

    // Progress State: { [videoId]: { currentTime: number, duration: number, completed: boolean } }
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return saved ? JSON.parse(saved) : {};
    });

    // Theme State
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('codeflix_theme');
        return saved || 'midnight';
    });

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.PLAYLIST, JSON.stringify(playlist));
    }, [playlist]);

    useEffect(() => {
        if (currentVideo) {
            localStorage.setItem(STORAGE_KEYS.LAST_PLAYED, JSON.stringify(currentVideo));
        }
    }, [currentVideo]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem('codeflix_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Actions
    const updateProgress = (videoId, currentTime, duration) => {
        setProgress((prev) => {
            const isCompleted = duration > 0 && (currentTime / duration) > 0.95; // 95% considered complete
            return {
                ...prev,
                [videoId]: {
                    currentTime,
                    duration,
                    completed: prev[videoId]?.completed || isCompleted,
                },
            };
        });
    };

    const playVideo = (video) => {
        setCurrentVideo(video);
    };

    return {
        playlist,
        setPlaylist,
        currentVideo,
        playVideo,
        progress,
        updateProgress,
        theme,
        setTheme,
    };
}
