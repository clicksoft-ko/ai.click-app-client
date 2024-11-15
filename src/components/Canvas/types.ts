export interface CanvasProps {
  tool: "pen" | "eraser";
  color: string;
  lineWidth: number;
  onSave: () => void;
  onLoad: () => void;
} 