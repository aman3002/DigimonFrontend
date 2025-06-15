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
    postlink,
}) {
    return (
        <div className="large-background-box">
            <div className="video-section-wrapper">
                {mediaType === 'vid' && (
                    <video
                className="media-player"
                src={mediaSrc}
                autoPlay
                muted
                loop
                controls
                style={{ maxWidth: '100%', borderRadius: '12px' }}
                >
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
               {mediaType === 'img' && (
  <img
    className="media-player"
    src={mediaSrc}
    alt="media"
  />
)}



                <div className="right-section">
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
                            <p className="timestamp">
                            {new Date(timestamp).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                                timeZone: 'Asia/Kolkata'
                            })}
                            </p>
                        </div>
                        <div className="info-group">
                            <Image src={locationn} alt="clock" className="icon clock" />
                            <p className="timestamp">{location}</p>
                        </div>
                        {postlink.includes("https://")&&
                        <div className="info-group">
                            <a href={postlink} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={loginIcon}
                                    alt="login"
                                    className="icon login"
                                    style={{ marginTop: '5px', marginLeft: '10px' }}
                                />
                            </a>
                        </div>}
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
                                <a
                                    href={c.profile_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'white', textDecoration: 'underline', fontWeight: 500,fontSize:20 }}
                                >
                                    {c.user}
                                </a>: {c.comment_text}
                                </p></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
