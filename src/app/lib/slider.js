import React from 'react';
import ContentCard from './contentcard';
import './slider.css';

export default function ContentCardSlider({ items }) {
    return (
        <div className="native-vertical-slider">
            {items.map((item) => (
                <div key={item.id} className="native-slide-item">
                    <ContentCard
                        mediaType={item.mediaType}
                        mediaSrc={item.mediaSrc}
                        username={item.username}
                        likes={item.likes}
                        timestamp={item.timestamp}
                        description={item.description}
                        comments={item.comments}
                        onLoginClick={item.onLoginClick}
                    />
                </div>
            ))}
        </div>
    );
}

