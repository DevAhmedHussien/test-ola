export interface Point {
  id: number;
  title: string;
}

export interface CirclePointsProps {
  points: Point[];
  activeId: number | null;
  onPointClick: (id: number) => void;
  onPointHover: (id: number | null) => void;
}