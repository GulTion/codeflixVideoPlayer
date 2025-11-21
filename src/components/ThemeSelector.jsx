import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const THEMES = [
    { id: 'midnight', name: 'Midnight', color: '#0a0a0a' },
    { id: 'ocean', name: 'Ocean', color: '#0f172a' },
    { id: 'sunset', name: 'Sunset', color: '#2b0a0a' },
    { id: 'forest', name: 'Forest', color: '#0a190a' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#000000', accent: '#ff00ff' },
    { id: 'light', name: 'Light', color: '#ffffff', border: true },
];

export function ThemeSelector({ currentTheme, onThemeChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-premium-accent/50",
                    "bg-premium-gray hover:bg-premium-gray/80 text-premium-text"
                )}
                title="Change Theme"
                aria-label="Change Theme"
            >
                <Palette className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-premium-dark border border-premium-gray/30 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 space-y-1">
                        {THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => {
                                    onThemeChange(theme.id);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                                    currentTheme === theme.id
                                        ? "bg-premium-accent/10 text-premium-accent"
                                        : "text-premium-text hover:bg-premium-gray/50"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-4 h-4 rounded-full shadow-sm",
                                        theme.border && "border border-gray-300"
                                    )}
                                    style={{
                                        backgroundColor: theme.color,
                                        boxShadow: theme.accent ? `0 0 5px ${theme.accent}` : 'none'
                                    }}
                                />
                                <span className="flex-1 text-left">{theme.name}</span>
                                {currentTheme === theme.id && <Check className="w-3.5 h-3.5" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
