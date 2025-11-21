import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { cn } from '../utils/cn';

export function ShortcutsHelp({ isOpen, onClose }) {
    if (!isOpen) return null;

    const shortcuts = [
        { key: 'Space / K', action: 'Play / Pause' },
        { key: 'F', action: 'Toggle Fullscreen' },
        { key: 'M', action: 'Mute / Unmute' },
        { key: '← / J', action: 'Rewind 10s' },
        { key: '→ / L', action: 'Forward 10s' },
        { key: '↑ / ↓', action: 'Volume Up / Down' },
        { key: '0-9', action: 'Jump to 0% - 90%' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-premium-dark border border-premium-gray/30 rounded-2xl shadow-2xl p-6 m-4 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-premium-gray/50 text-premium-muted hover:text-premium-text transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-premium-accent/10 text-premium-accent">
                        <Keyboard className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-premium-text">Keyboard Shortcuts</h2>
                </div>

                <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-premium-gray/20 hover:bg-premium-gray/30 transition-colors">
                            <span className="font-mono text-sm font-bold text-premium-accent bg-premium-dark/50 px-2 py-1 rounded border border-premium-gray/30 min-w-[80px] text-center">
                                {shortcut.key}
                            </span>
                            <span className="text-sm font-medium text-premium-text/80">
                                {shortcut.action}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center text-xs text-premium-muted">
                    Press <span className="font-mono font-bold text-premium-text">?</span> to toggle this menu
                </div>
            </div>
        </div>
    );
}
