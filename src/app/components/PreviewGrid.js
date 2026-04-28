import React from 'react';
import './PreviewGrid.css';

/**
 * PreviewGrid — A 3×3 preview grid overlay that shows the first 9 items
 * fetched from the backend for the selected platform.
 *
 * Props:
 * - items: Array of normalized item objects (same shape as ContentCardSlider items)
 * - onItemClick: (index) => void — called when a cell is clicked
 * - platformName: string — current platform display name (e.g. "Instagram")
 */
export default function PreviewGrid({ items = [], onItemClick, platformName = '' }) {
    // Take only the first 9 items for the 3×3 grid
    const gridItems = items.slice(0, 9);

    if (!gridItems || gridItems.length === 0) {
        return (
            <div className="preview-grid-wrapper">
                <div className="preview-grid-empty">
                    No recent posts to preview
                </div>
            </div>
        );
    }

    /**
     * Determine content type label from the item data.
     * Reuses the same logic as ContentCard.js line 647.
     */
    const getContentType = (item) => {
        if (item.postlink?.includes('https://')) return 'Post';
        if (item.currentPlatform?.value === 'TWITTER') return 'Post';
        if (item.currentPlatform?.value === 'YOUTUBE') return 'Video';
        if (item.currentPlatform?.value === 'TELEGRAM') return 'Message';
        return 'Story';
    };

    /**
     * Format the like count for compact display
     */
    const formatLikes = (count) => {
        if (count === undefined || count === null) return '—';
        const n = Number(count);
        if (isNaN(n)) return count;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return n.toString();
    };

    /**
     * Truncate long text for display
     */
    const truncate = (str, maxLen) => {
        if (!str) return '';
        return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
    };

    /**
     * Render the media content inside the frame.
     * Handles image, video, iframe, text-only (Telegram), and fallback.
     */
    const renderMedia = (item) => {
        const platform = item.currentPlatform?.value;
        const mediaType = item.mediaType;
        const mediaSrc = item.mediaSrc;

        // Telegram text-only posts
        if (platform === 'TELEGRAM' && mediaType === 'text') {
            return (
                <div className="preview-cell-text-content">
                    {truncate(item.description, 120)}
                </div>
            );
        }

        // Image
        if (mediaType === 'img' && mediaSrc) {
            return (
                <img
                    className="preview-cell-media"
                    src={mediaSrc}
                    alt={item.username || 'post'}
                    loading="lazy"
                />
            );
        }

        // Video — show as a poster or thumbnail
        if (mediaType === 'vid' && mediaSrc) {
            return (
                <video
                    className="preview-cell-video"
                    src={mediaSrc}
                    muted
                    preload="metadata"
                />
            );
        }

        // Iframe (YouTube embeds, etc.)
        if (mediaType === 'iframe' && mediaSrc) {
            return (
                <div className="preview-cell-iframe-wrap">
                    <iframe
                        src={mediaSrc}
                        title={item.username || 'embed'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            );
        }

        // Fallback — no media
        return (
            <div className="preview-cell-no-media">
                No preview available
            </div>
        );
    };

    return (
        <div className="preview-grid-wrapper">
            {/* Header */}
            <div className="preview-grid-header">
                <div className="preview-grid-title">
                    <span className="preview-grid-title-dot"></span>
                    {platformName ? `${platformName} — Recent` : 'Recent Posts'}
                </div>
            </div>

            {/* 3×3 Grid */}
            <div className="preview-grid">
                {gridItems.map((item, index) => {
                    const contentType = getContentType(item);
                    const isStory = contentType === 'Story';

                    return (
                        <div
                            key={item.id || index}
                            className="preview-grid-cell"
                            onClick={() => onItemClick && onItemClick(index)}
                        >
                            {/* === Outer metadata — top row === */}
                            <div className="preview-cell-meta-top">
                                <span className={`preview-cell-type ${isStory ? 'story' : ''}`}>
                                    {contentType}
                                </span>
                                <span className="preview-cell-date">
                                    {truncate(item.timestamp, 22)}
                                </span>
                            </div>

                            {/* === Inner media frame === */}
                            <div className="preview-cell-frame">
                                {renderMedia(item)}

                                {/* Username — top-left inside frame */}
                                <div className="preview-frame-overlay preview-frame-username">
                                    <span className="preview-frame-username-icon">👤</span>
                                    {truncate(item.username, 16)}
                                </div>

                                {/* Likes — top-right inside frame */}
                                <div className="preview-frame-overlay preview-frame-likes">
                                    <span className="preview-likes-icon">♥</span>
                                    {formatLikes(item.likes)}
                                </div>

                                {/* Hover click hint */}
                                <div className="preview-cell-click-hint">
                                    <span className="preview-cell-click-hint-text">
                                        View Details →
                                    </span>
                                </div>
                            </div>

                            {/* === Outer metadata — bottom row === */}
                            <div className="preview-cell-meta-bottom">
                                <span className="preview-cell-location">
                                    <span className="preview-location-icon">📍</span>
                                    {truncate(item.location, 20) || '—'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
