import React, { useState, useEffect } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import NewsSquare from './components/NewsSquare';
import WeatherSquare from './components/WeatherSquare';
import RadioSquare from './components/RadioSquare'; // Import the RadioSquare component

const App = () => {
    const [news, setNews] = useState([]);
    const [weather, setWeather] = useState(null);

    // Fetch the latest news
    useEffect(() => {
        fetch('https://api.allorigins.win/get?url=https://www.nrk.no/toppsaker.rss')
            .then((response) => response.json())
            .then((data) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
                const items = xmlDoc.getElementsByTagName('item');

                const newsData = Array.from(items).slice(0, 10).map((item) => ({
                    title: item?.getElementsByTagName('title')[0]?.textContent || 'No title',
                    image:
                        item?.getElementsByTagName('media:content')[0]?.getAttribute('url') ||
                        'https://via.placeholder.com/300',
                }));

                setNews(newsData);
            })
            .catch((err) => console.error('Error fetching news:', err));
    }, []);

    // Fetch weather data
    useEffect(() => {
        const locationKey = "59.91,10.75"; // Example for Oslo (latitude, longitude)
        fetch(
            `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${locationKey.split(",")[0]}&lon=${locationKey.split(",")[1]}`
        )
            .then((response) => response.json())
            .then((data) => {
                const now = new Date();
                const hour = now.getHours();

                const image =
                    hour < 12
                        ? '/morningphoto.jpg'
                        : hour < 18
                        ? '/middayphoto.jpg'
                        : '/eveningphoto.jpg';

                const temperature = data.properties.timeseries[0].data.instant.details.air_temperature;
                const feelsLike = data.properties.timeseries[0].data.instant.details.relative_humidity;

                setWeather({
                    temperature,
                    feelsLike,
                    image,
                });
            })
            .catch((err) => console.error('Error fetching weather:', err));
    }, []);

    return (
        <div className="App">
            {/* Left column for Weather and Radio */}
            <div className="column">
                <Swiper direction="vertical" className="swiper">
                    <SwiperSlide className="square">
                        {weather && (
                            <WeatherSquare
                                temperature={weather.temperature}
                                feelsLike={weather.feelsLike}
                                image={weather.image}
                            />
                        )}
                    </SwiperSlide>
                    <SwiperSlide className="square">
                        <RadioSquare />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Right column for News */}
            <div className="column">
                <Swiper direction="vertical" className="swiper">
                    {news.map((item, index) => (
                        <SwiperSlide key={index} className="square">
                            <NewsSquare title={item.title} image={item.image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default App;
