import './App.scss'
import '../node_modules/swiper/swiper.scss'
import CircleApp from './components/CircleApp/circleApp';

const App: React.FC = () => {
	

  return (
    <div className="container">
      <CircleApp />
      <CircleApp />
    </div>
  );
};

export default App;