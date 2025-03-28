import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./navbar.css";
import "./gradient.css";
import GradientVideoDownloader from "./widgets/gradient_video_downloader";
import ColorSwatch from "./components/colorcard"; // Import the ColorSwatch component
import colorData from "./data/colors.json"; // Import the color data

interface Color {
  name: string;
  code: string;
  hex: string;
}

function App() {
  const [, setIsInputFocused] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Color[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== "") {
      const results = colorData
        .filter((color) =>
          color.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 4); // Limit results to the first 4
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current?.value.trim() !== "") {
      setIsEnterPressed(true);
    }
  };

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      svg.style.transition = "transform 0.5s ease"; // Add transition for smooth animation

      if (isEnterPressed) {
        svg.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#ffffff"></path>
      <path d="M16.4698 7.96967L10.0001 14.4393L7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967Z" fill="none"></path>`;
        svg.style.transform = "scale(1.1)"; // Slightly scale up for focus

        const timeoutId = setTimeout(() => {
          setIsEnterPressed(false);
          if (inputRef.current) {
            inputRef.current.value = "";
            setSearchTerm("");
            setSearchResults([]);
          }
        }, 500);

        return () => clearTimeout(timeoutId);
      } else {
        svg.innerHTML = `<path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.87884 8.42139H14.8286C15.0206 8.42139 15.2125 8.49461 15.3589 8.64106C15.4309 8.71296 15.4851 8.79584 15.5217 8.8843C15.5584 8.97273 15.5786 9.06969 15.5786 9.17139V14.1212C15.5786 14.5354 15.2428 14.8712 14.8286 14.8712C14.4144 14.8712 14.0786 14.5354 14.0786 14.1212V10.982L9.70207 15.3586C9.40918 15.6515 8.93431 15.6515 8.64141 15.3586C8.34852 15.0657 8.34852 14.5908 8.64141 14.2979L13.018 9.92139H9.87884C9.46463 9.92139 9.12884 9.5856 9.12884 9.17139C9.12884 8.75717 9.46463 8.42139 9.87884 8.42139Z" fill="#ffffff"></path>`;
        svg.style.transform = "scale(1)"; // Reset scale
      }
    }
  }, [isEnterPressed]);

  const handleColorClick = (color: Color) => {
    setSelectedColors((prevColors) => {
      const updatedColors = [...prevColors];
      const colorIndex = updatedColors.findIndex((c) => c.code === color.code);

      if (colorIndex !== -1) {
        // Color already selected, remove it
        updatedColors.splice(colorIndex, 1);
      } else {
        // Color not selected, add it
        updatedColors.push(color);
        if (updatedColors.length > 3) {
          updatedColors.shift(); // Remove the oldest color if more than 3 are selected
        }
      }
      updateGradientBackground(updatedColors);
      return updatedColors;
    });
  };

  const updateGradientBackground = (colors: Color[]) => {
    const body = document.body;
    if (body) {
      if (colors.length > 0) {
        const gradientString = colors.map((color) => color.hex).join(", ");
        body.style.background = `linear-gradient(45deg, ${gradientString})`;
        body.style.backgroundSize = "200% 200%";
        body.style.animation = "gradient 10s ease infinite";
      } else {
        body.style.background = `linear-gradient(45deg, #871b1b, #e12626)`;
        body.style.backgroundSize = "200% 200%";
        body.style.animation = "gradient 10s ease infinite";
      }
    }
  };

  useEffect(() => {
    updateGradientBackground(selectedColors);
  }, [selectedColors]);

  return (
    <div className="App">
      <div className="logo">FLOW.</div>
      <div className="search-results-container">
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((color) => (
              <div
                className={`search-result-item`}
                key={color.code}
                onClick={() => handleColorClick(color)}
              >
                <ColorSwatch
                  colorName={color.name}
                  colorCode={color.code}
                  hexCode={color.hex}
                  isSelected={selectedColors.some((c) => c.code === color.code)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Add Colors"
          id="searchInput"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <div className="search-icon">
          <svg
            ref={svgRef}
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#ffffff"
            strokeWidth="1.5"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.87884 8.42139H14.8286C15.0206 8.42139 15.2125 8.49461 15.3589 8.64106C15.4309 8.71296 15.4851 8.79584 15.5217 8.8843C15.5584 8.97273 15.5786 9.06969 15.5786 9.17139V14.1212C15.5786 14.5354 15.2428 14.8712 14.8286 14.8712C14.4144 14.8712 14.0786 14.5354 14.0786 14.1212V10.982L9.70207 15.3586C9.40918 15.6515 8.93431 15.6515 8.64141 15.3586C8.34852 15.0657 8.34852 14.5908 8.64141 14.2979L13.018 9.92139H9.87884C9.46463 9.92139 9.12884 9.5856 9.12884 9.17139C9.12884 8.75717 9.46463 8.42139 9.87884 8.42139Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </div>
      {/* <div className="title-bar">
        <div className="logo"></div>
        <GradientVideoDownloader duration={10} />
      </div> */}
    </div>
  );
}

export default App;
