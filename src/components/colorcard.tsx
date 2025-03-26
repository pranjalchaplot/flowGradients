// colorcard.tsx
import "../App.css";

interface ColorSwatchProps {
  colorName: string;
  colorCode: string;
  hexCode: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colorName,
  colorCode,
  hexCode,
}) => {
  return (
    <div className="color-swatch">
      <div className="color-block" style={{ backgroundColor: hexCode }} />
      <div className="color-info">
        <div className="pantone-text">FLOW</div>
        <div className="color-code">{colorCode}</div>
        <div className="color-name">{colorName}</div>
      </div>
    </div>
  );
};

export default ColorSwatch;
