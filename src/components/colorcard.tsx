import "../App.css";

const ColorSwatch = ({
  colorName = "Peach Fuzz",
  colorCode = "13-1023",
  hexCode = "#FFBE98",
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
