import React from 'react';
import './NewsSquare.css';

const NewsSquare = ({ title, image }) => {
    return (
        <div className="news-square">
            <img src={image} alt={title} className="news-image" />
            <div className="news-content">
            <img src="/nrknyheter.png" alt="nrknyheter" className="nrknyheter" />
                <h2 className="news-title">{title}</h2>
            </div>
        </div>
    );
};

export default NewsSquare;
