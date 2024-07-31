import React from "react";
import { SwiperProps, SwiperSlide } from "swiper/react";
import './contentSlider.css';
import { Slider } from '../slider/Slider';

interface ContentSliderProps<T> {
    title: string;
    data: T[] | undefined;
    isLoading: boolean;
    settings: SwiperProps;
    keyExtractor: (item: T) => string | number;
    renderItem: (item: T) => React.ReactNode;
}

export const ContentSlider = <T,>({
    title,
    data,
    isLoading,
    settings,
    keyExtractor,
    renderItem,
}: ContentSliderProps<T>) => {
    return (
        <div>
            <h1 className="popularText">{title}</h1>
            <Slider className="slidePopular" settings={settings}>
                {isLoading && <p>Loading...</p>}
                {data?.map(item => (
                    <SwiperSlide className="swiperPopular"  key={keyExtractor(item)}>
                        {renderItem(item)}
                    </SwiperSlide>
                ))}
            </Slider>
        </div>
    );
};
