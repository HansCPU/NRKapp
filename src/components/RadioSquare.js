import React, { useState } from 'react';
import './RadioSquare.css';

const RadioSquare = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="radio-square">
            <img
                src="nrknyheter.png"
                alt="NRK Nyheter Logo"
                className="radio-image"
            />
            <div className="radio-content">
                <h2 className="radio-title">NRK Nyheter</h2>
                <button className="radio-play-button" onClick={togglePlay}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <audio ref={audioRef} src="https://cdn0-47115-liveicecast0.dna.contentdelivery.net/nyheter_mp3_l"></audio>
            </div>
        </div>
    );
};

export default RadioSquare;
