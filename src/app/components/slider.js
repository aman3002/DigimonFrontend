import React from 'react';
import ContentCard from './ContentCard';
import './slider.css';

export default function ContentCardSlider({ items }) {
    return (
        <div className="content-slider">
            {items?.map((item) => (
                <div key={item.id} className="slide-item">
                    <ContentCard
                        mediaType={item.mediaType}
                        mediaSrc={item.mediaSrc}
                        username={item.username}
                        selectedPlatform={item.currentPlatform.value}
                        likes={item.likes}
                        selectedOption={item.selectedOption}
                        timestamp={item.timestamp}
                        watchlistUpdate={item.watchlist}
                        watchlist={item.watchlists}
                        location={item.location}
                        userProfileLink={item.userProfileLink}
                        description={item.description}
                        comments={item.comments}
                        postlink={item.postlink}
                    />
                    {console.log(item)}
                </div>
            ))}
        </div>
    );
}
