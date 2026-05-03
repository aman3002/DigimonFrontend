import React from 'react';
import Image from 'next/image';
import personIcon from '../Assets/profile.svg';
import heartIcon from '../Assets/heart.png';
import clockIcon from '../Assets/clock.png';
import loginIcon from '../Assets/login.png';
import locationIcon from '../Assets/location2.png';
import commentsIcon from '../Assets/bookIcon.png';
import redirect from '../Assets/redirect.jpg';
import './PreviewGrid.css';

/**
 * PreviewGrid — 4×2 grid of compact ContentCards.
 * Each cell mirrors the list-view card layout exactly:
 *   Left: media | Right: info-bar, type, description, comments
 *
 * Props:
 * - items: Array of normalized item objects (same shape as ContentCardSlider)
 * - onItemClick: (index) => void — called when a cell is clicked
 * - platformName: string
 */
export default function PreviewGrid({ items = [], onItemClick, platformName = '' }) {
    const gridItems = items.slice(0, 8);

    if (!gridItems || gridItems.length === 0) {
        return (
            <div className="preview-grid-wrapper">
                <div className="preview-grid-empty">
                    No recent posts to preview
                </div>
            </div>
        );
    }

    const getContentType = (item) => {
        if (item.postlink?.includes('https://')) return 'Post';
        const platform = item.currentPlatform?.value;
        if (platform === 'TWITTER') return 'Post';
        if (platform === 'YOUTUBE') return 'Video';
        if (platform === 'TELEGRAM') return 'Message';
        return 'Story';
    };

    const truncate = (str, maxLen) => {
        if (!str) return '';
        return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
    };

    const renderMedia = (item) => {
        const platform = item.currentPlatform?.value;
        const mediaType = item.mediaType;
        const mediaSrc = item.mediaSrc;

        // Telegram text-only
        if (platform === 'TELEGRAM' && mediaType === 'text') {
            return (
                <div className="pgrid-media-text">
                    {truncate(item.description, 80)}
                </div>
            );
        }

        // Telegram non-text — redirect image
        if (platform === 'TELEGRAM' && mediaType !== 'text') {
            return (
                <img
                    src={redirect.src}
                    alt="media"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.postlink, '_blank', 'noopener,noreferrer');
                    }}
                />
            );
        }

        if (mediaType === 'vid' && mediaSrc) {
            return (
                <video
                    src={mediaSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            );
        }

        if (mediaType === 'iframe' && mediaSrc) {
            return <iframe src={mediaSrc} title={item.username || 'embed'} />;
        }

        if (mediaType === 'img' && mediaSrc) {
            return <img src={mediaSrc} alt={item.username || 'post'} loading="lazy" />;
        }

        if (!mediaType || !['vid', 'iframe', 'img'].includes(mediaType)) {
            return <div className="pgrid-media-placeholder">No image/video</div>;
        }

        return null;
    };

    return (
        <div className="preview-grid-wrapper">
            {/* 4×2 Grid */}
            <div className="preview-grid">
                {gridItems.map((item, index) => {
                    const contentType = getContentType(item);
                    const platform = item.currentPlatform?.value;
                    const postlink = item.postlink;
                    const comments = item.comments || [];

                    return (
                        <div
                            key={item.id || index}
                            className="pgrid-cell"
                            onClick={() => onItemClick && onItemClick(index)}
                        >
                            {/* Left — Media */}
                            <div className="pgrid-media">
                                {renderMedia(item)}
                            </div>

                            {/* Right — Info (mirrors ContentCard right-section) */}
                            <div className="pgrid-info">
                                {/* Info bar — username, likes, time, location, link */}
                                <div className="pgrid-info-bar">
                                    <div className="pgrid-info-group">
                                        <Image src={personIcon} alt="person" className="pgrid-icon" />
                                        <p className="pgrid-info-text username">{truncate(item.username, 14)}</p>
                                    </div>
                                    <div className="pgrid-info-group">
                                        <Image src={heartIcon} alt="heart" className="pgrid-icon" />
                                        <p className="pgrid-info-text">{item.likes}</p>
                                    </div>
                                    <div className="pgrid-info-group">
                                        <Image src={clockIcon} alt="clock" className="pgrid-icon" />
                                        <p className="pgrid-info-text">{truncate(item.timestamp, 20)}</p>
                                    </div>
                                    <div className="pgrid-info-group">
                                        <Image src={locationIcon} alt="location" className="pgrid-icon" />
                                        <p className="pgrid-info-text">{truncate(item.location, 12) || '—'}</p>
                                    </div>
                                    {postlink?.includes('https://') && (
                                        <div className="pgrid-info-group">
                                            <a
                                                href={postlink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Image src={loginIcon} alt="link" className="pgrid-icon" />
                                            </a>
                                        </div>
                                    )}
                                    {postlink && /^\d+$/.test(postlink.split('/').pop()) && !postlink.includes('t.me') && (
                                        <div className="pgrid-info-group">
                                            <a
                                                href={`https://x.com/premium/status/${postlink}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Image src={loginIcon} alt="link" className="pgrid-icon" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Type */}
                                <div className="pgrid-desc-box">
                                    <p className="pgrid-desc-text">Type : {contentType}</p>
                                </div>

                                {/* Comments */}
                                <div className="pgrid-comments-header">
                                    <Image src={commentsIcon} alt="comments" className="pgrid-icon" />
                                    <p className="pgrid-comments-title">Comments</p>
                                </div>

                                <div className="pgrid-comments-box">
                                    {comments.length > 0 ? (
                                        comments.slice(0, 3).map((c, idx) => (
                                            <p key={idx} className="pgrid-comment-text">
                                                <a
                                                    href={c.profile_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {c.user}
                                                </a>: {truncate(c.comment_text, 50)}
                                            </p>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
