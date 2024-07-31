import { Swiper, SwiperProps } from 'swiper/react';
import './Slider.css';
import { ReactNode } from 'react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import classNames from 'classnames';

interface SliderProps {
    children: ReactNode;
    settings: SwiperProps;
    className?: string;
}

export const Slider = ({ children, settings, className }: SliderProps) => {

    const defaultClasses = 'swiper__container';

    return (
        <Swiper modules={[Navigation, Pagination, A11y, Autoplay]} {...settings} className={classNames(className, defaultClasses)}>
            {children}
        </Swiper>
    );
}