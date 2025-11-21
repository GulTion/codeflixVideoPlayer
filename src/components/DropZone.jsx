import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { parseM3U } from '../utils/m3uParser';
import { cn } from '../utils/cn';

export function DropZone({ onPlaylistLoaded, className }) {
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.m3u') || file.name.endsWith('.m3u8'))) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                const playlist = parseM3U(content);
                onPlaylistLoaded(playlist);
            };
            reader.readAsText(file);
        }
    }, [onPlaylistLoaded]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={cn(
                "border-2 border-dashed border-premium-gray hover:border-premium-accent rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-premium-muted hover:text-premium-text bg-premium-dark/50 backdrop-blur-sm hover:bg-premium-dark/80 group",
                className
            )}
        >
            <div className="p-3 rounded-full bg-premium-gray/50 group-hover:bg-premium-accent/20 transition-colors mb-3">
                <Upload className="w-6 h-6 group-hover:text-premium-accent transition-colors" />
            </div>
            <p className="text-sm font-medium">Drop .m3u file here</p>
        </div>
    );
}
