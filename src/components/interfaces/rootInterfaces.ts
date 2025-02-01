export interface Point {
  id: number;
  angle: number;
  active: boolean;
	name: string
}

export interface SliderNote {
	year: number;
	text: string;
}

export interface NotesProps {
	[key: string]: SliderNote[];
}

export interface SliderPanelProps {
  points: Point[];
  notes: { [key: string]: SliderNote[] };
  isAnimating: boolean;
}

export interface CircleContainerProps {
  points: Point[];
  circleAngle: number;
  hoveredPoint: Point | null;
  handleMouseOver: (point: Point) => void;
  handleMouseOut: () => void;
  handleClick: (point: Point) => void;
  isAnimating: boolean;
}

export interface SwitcherContainerProps {
  points: Point[];
  isAnimating: boolean;
  pointIdFinder?: number;
  setPrevPage: () => void;
  setNextPage: () => void;
}

export interface CircleDateProps {
  isAnimating: boolean;
  activeNotes: SliderNote[];
}

