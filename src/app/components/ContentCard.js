import React from 'react';
import Image from 'next/image';
import personIcon from '../Assets/profile.png';
import heartIcon from '../Assets/heart.png';
import clockIcon from '../Assets/clock.png';
import loginIcon from '../Assets/login.png';
import locationn from '../Assets/location2.png';
import commentsIcon from '../Assets/bookIcon.png';
import './ContentCard.css';

/**
 * Props:
 * - mediaType: 'video' | 'iframe' | 'image'
 * - mediaSrc: string
 * - username: string
 * - likes: number
 * - timestamp: string
 * - description: string
 * - comments: Array<{ user: string; text: string }>;
 * - onLoginClick?: () => void
 */
export default function ContentCard({
    mediaType,
    mediaSrc,
    username,
    likes,
    timestamp,
    location,
    description,
    comments = [],
    onLoginClick,
}) {
    return (
        <div className="large-background-box">
            <div className="video-section-wrapper">
                {mediaType === 'video' && (
                    <video className="media-player" controls>
                        <source src={mediaSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                {mediaType === 'iframe' && (
                    <iframe
                        className="media-player"
                        src={mediaSrc}
                        frameBorder="0"
                        allowFullScreen
                    />
                )}
                {mediaType === 'image' && (
                    <Image
                        className="media-player"
                        src={mediaSrc}
                        alt="media"
                        layout="responsive"
                        width={16}
                        height={9}
                    />
                )}

                <div className="village-info-box">
                    <div className="info-group">
                        <Image src={personIcon} alt="person" className="icon person" />
                        <p className="username">{username}</p>
                    </div>
                    <div className="info-group">
                        <Image src={heartIcon} alt="heart" className="icon heart" />
                        <p className="likes">{likes}</p>
                    </div>
                    <div className="info-group">
                        <Image src={clockIcon} alt="clock" className="icon clock" />
                        <p className="timestamp">{timestamp}</p>
                    </div>
                    <div className="info-group">
                        <Image src={locationn} alt="clock" className="icon clock" />
                        <p className="timestamp">{location}</p>
                    </div>
                    <div className="info-group">
                        <Image
                            src={loginIcon}
                            alt="login"
                            className="icon login"
                            onClick={onLoginClick}
                        />
                    </div>
                </div>

                <div className="description-box">
                    <p className="description-text">{description}</p>
                </div>

                <div className="comments-header">
                    <Image
                        src={commentsIcon}
                        alt="comment"
                        className="icon comment"
                    />
                    <p className="comment-title">Comments</p>
                </div>

                <div className="comments-box">
                    {comments.map((c, idx) => (
                        <div key={idx} className="comment">
                            <p className="comment-text">
                                {c.user}: {c.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
