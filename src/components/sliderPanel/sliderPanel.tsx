import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import scienceNotes from './sliderNotes';
import './sliderPanel.scss'

const NotesPanel = ({ points }) => {
  const activePoint = points.find((point) => point.active);
  const notes = scienceNotes.filter((note) => note.name === activePoint.name);

  return (
    <div className="notes-panel">
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {notes.map((note, index) => (
          <SwiperSlide key={index}>
            <div className="note">
              <span className="year">{note.year}</span>
              <p className="text">{note.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default NotesPanel;