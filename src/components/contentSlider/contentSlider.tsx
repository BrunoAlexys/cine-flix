import React from "react";
import { SwiperProps, SwiperSlide } from "swiper/react";
import './contentSlider.css';
import { Slider } from '../slider/Slider';
import { Link } from "react-router-dom";

interface ContentSliderProps<T> {
    title: string;
    data: T[] | undefined;
    isLoading: boolean;
    settings: SwiperProps;
    keyExtractor: (item: T) => string | number;
    renderItem: (item: T) => React.ReactNode;
    type: string;
}

export const ContentSlider = <T,>({
    title,
    data,
    isLoading,
    settings,
    keyExtractor,
    renderItem,
    type
}: ContentSliderProps<T>) => {
    return (
        <div>
            <h1 className="popularText">{title}</h1>
            <Slider className="slidePopular" settings={settings}>
                {isLoading && <p>Loading...</p>}
                {data?.map(item => (
                    <SwiperSlide className="swiperPopular"  key={keyExtractor(item)}>
                        {<Link to={`/avaliation/${type}/${keyExtractor(item)}`}>{renderItem(item)}</Link>}
                    </SwiperSlide>
                ))}
            </Slider>
        </div>
    );
};
