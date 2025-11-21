import React, { useState, useEffect } from 'react';
import { MonitorPlay, Keyboard } from 'lucide-react';
import { cn } from '../utils/cn';
import { ShortcutsHelp } from './ShortcutsHelp';
import { ThemeSelector } from './ThemeSelector';

export function Layout({ children, theme, setTheme }) {
    const [showShortcuts, setShowShortcuts] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                setShowShortcuts(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={cn(
            "min-h-screen w-full transition-colors duration-500 flex flex-col font-sans selection:bg-premium-accent/30",
            "bg-premium-black text-premium-text" // Always use variables now
        )}>
            <ShortcutsHelp isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

            <header className={cn(
                "h-16 border-b flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500",
                "bg-premium-black/80 border-premium-gray/30"
            )}>
                <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-10 h-10 bg-gradient-to-br from-premium-accent to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-premium-accent/20 group-hover:scale-105 transition-transform duration-300">
                        <MonitorPlay className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight leading-none">CodeFlix</h1>
                        <span className="text-xs font-medium text-premium-accent tracking-widest uppercase">Premium Player</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowShortcuts(true)}
                        className={cn(
                            "p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-premium-accent/50",
                            "bg-premium-gray hover:bg-premium-gray/80 text-premium-muted hover:text-premium-text"
                        )}
                        title="Keyboard Shortcuts (?)"
                        aria-label="Keyboard Shortcuts"
                    >
                        <Keyboard className="w-5 h-5" />
                    </button>

                    <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
}
