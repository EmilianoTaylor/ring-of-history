import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import './sliderPanel.scss'
import { SliderPanelProps, SliderNote } from '../interfaces/rootInterfaces';

const NotesPanel = ({ points, notes, isAnimating }: SliderPanelProps) => {
  const activePoint = points.find((point) => point.active);
  const activeNotes = notes[activePoint?.name ?? ''];
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className={`notes-panel ${isAnimating ? 'hidden' : ''}`}>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={(window.innerWidth < 768) ? 2 : 4}
      >
        {activeNotes.map((note: SliderNote, index: number) => (
          <SwiperSlide key={index}>
            <div className="note">
              <span className="year">{note.year}</span>
              <p className="text">{note.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev" onClick={() => swiperRef.current?.slidePrev()}>←</div>
      <div className="swiper-button-next" onClick={() => swiperRef.current?.slideNext()}>→</div>
    </div>
  );
};

export default NotesPanel;