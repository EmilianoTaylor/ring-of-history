// @ts-nocheck
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import './sliderPanel.scss'

const NotesPanel = ({ points, notes, isAnimating }) => {
  const activePoint = points.find((point) => point.active);
  const activeNotes = notes[activePoint.name];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className={`notes-panel ${isAnimating ? 'hidden' : ''}`}>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={(window.innerWidth < 768) ? 2 : 4}
      >
        {activeNotes.map((note, index) => (
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