import Carousel from "./Carousel";
import { countries } from "./Data";

function Slideshow() {
    return (
        <Carousel images={countries} />
    );
}

export default Slideshow;