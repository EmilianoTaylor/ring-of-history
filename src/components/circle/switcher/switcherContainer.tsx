import { Point, SwitcherContainerProps } from '../../interfaces/rootInterfaces'
import './switcherContainer.scss'

const SwitcherContainer = ({points, isAnimating, pointIdFinder, setPrevPage, setNextPage }: SwitcherContainerProps) => {
	return (
		<>
			<div className={`switcherContainer ${isAnimating ? 'hidden' : ''}`}>
				<span className='switcherPageNumbers'>{pointIdFinder}/{points.length}</span>
				<span className='switcherButtons'>
					<button className="switcherPrev" onClick={setPrevPage} disabled={pointIdFinder== 1}>←</button>
					<button className="switcherNext" onClick={setNextPage} disabled={pointIdFinder == 6}>→</button>
				</span>	
			</div>
			<div className="dots-container">
				{points.map((point: Point, index: number) => (
					<div
						key={index}
						className={`dot ${point.active ? 'active' : ''}`}
					/>
				))}
			</div>
		</>

	)
}

export default SwitcherContainer