/**
 * Parses M3U file content into a playlist array.
 * @param {string} content - The raw content of the .m3u file.
 * @returns {Array<{id: string, title: string, url: string, duration: number}>}
 */
export function parseM3U(content) {
    const lines = content.split(/\r?\n/);
    const playlist = [];
    let currentItem = {};

    lines.forEach((line) => {
        line = line.trim();
        if (!line) return;

        if (line.startsWith("#EXTINF:")) {
            // Format: #EXTINF:duration,Title [ID: 123]
            const info = line.substring(8);
            const commaIndex = info.indexOf(",");
            if (commaIndex !== -1) {
                const durationStr = info.substring(0, commaIndex).trim();
                let title = info.substring(commaIndex + 1).trim();

                // Parse duration (supports seconds or HH:MM:SS)
                let duration = 0;
                if (durationStr.includes(':')) {
                    const parts = durationStr.split(':').map(Number);
                    if (parts.length === 3) {
                        duration = parts[0] * 3600 + parts[1] * 60 + parts[2];
                    } else if (parts.length === 2) {
                        duration = parts[0] * 60 + parts[1];
                    }
                } else {
                    duration = parseFloat(durationStr) || 0;
                }
                currentItem.duration = duration;

                // Extract ID from title if present [ID: 12345]
                const idMatch = title.match(/\[ID:\s*(\d+)\]/);
                if (idMatch) {
                    currentItem.id = idMatch[1];
                    // Remove ID from title for cleaner display
                    title = title.replace(/\[ID:\s*\d+\]/, '').trim();
                }

                currentItem.title = title;
            }
        } else if (!line.startsWith("#")) {
            // It's a URL or file path
            currentItem.url = line;

            // Fallback ID generation if not found in title
            if (!currentItem.id) {
                // Use a simple hash of the URL to ensure stability across reloads
                // This is better than randomUUID() which resets on every load
                let hash = 0;
                for (let i = 0; i < line.length; i++) {
                    const char = line.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash; // Convert to 32bit integer
                }
                currentItem.id = `gen-${Math.abs(hash)}`;
            }

            // Fallback title if missing
            if (!currentItem.title) {
                currentItem.title = line.split('/').pop() || 'Unknown Video';
            }

            playlist.push(currentItem);
            currentItem = {}; // Reset for next item
        }
    });

    return playlist;
}
