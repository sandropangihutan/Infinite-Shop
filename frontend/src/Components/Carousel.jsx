import { useEffect, useState } from "react";
import "../assets/css/carausel.css";

function Carousel({ images }) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    useEffect(() => {
        if (autoPlay) {
            timeOut = setTimeout(() => {
                slideRight();
            }, 3000);
        }
        return () => clearTimeout(timeOut);
    }, [current, autoPlay]);

    const slideRight = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const slideLeft = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div
            className="carousel"
            onMouseEnter={() => {
                setAutoPlay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoPlay(true);
            }}
        >
            <div
                className="carousel_wrapper"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="carousel_card"
                    >
                        <img className="card_image" src={image.image} alt="" />
                        <div className="card_overlay">
                            <h2 className="card_title">{image.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carousel_pagination">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={
                            index === current
                                ? "pagination_dot pagination_dot-active"
                                : "pagination_dot"
                        }
                        onClick={() => setCurrent(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
