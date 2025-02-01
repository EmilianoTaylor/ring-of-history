import { CircleDateProps } from '../../interfaces/rootInterfaces'
import './circleDates.scss'

const CircleDates = ({ isAnimating, activeNotes }: CircleDateProps) => {
	return (
		<div className={`circleDates ${isAnimating ? 'hidden' : ''}`}>
		<span className='firstDate'>{activeNotes[0].year}</span>
		<span className='secondDate'>{activeNotes[activeNotes.length - 1].year}</span>
	</div>
	)
}

export default CircleDates