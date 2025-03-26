import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./navbar.css";
import "./gradient.css";
import GradientVideoDownloader from "./widgets/gradient_video_downloader";
import ColorSwatch from "./components/colorcard"; // Import the ColorSwatch component

function App() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
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
          }
        }, 1000);

        return () => clearTimeout(timeoutId);
      } else {
        svg.innerHTML = `<path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.87884 8.42139H14.8286C15.0206 8.42139 15.2125 8.49461 15.3589 8.64106C15.4309 8.71296 15.4851 8.79584 15.5217 8.8843C15.5584 8.97273 15.5786 9.06969 15.5786 9.17139V14.1212C15.5786 14.5354 15.2428 14.8712 14.8286 14.8712C14.4144 14.8712 14.0786 14.5354 14.0786 14.1212V10.982L9.70207 15.3586C9.40918 15.6515 8.93431 15.6515 8.64141 15.3586C8.34852 15.0657 8.34852 14.5908 8.64141 14.2979L13.018 9.92139H9.87884C9.46463 9.92139 9.12884 9.5856 9.12884 9.17139C9.12884 8.75717 9.46463 8.42139 9.87884 8.42139Z" fill="#ffffff"></path>`;
        svg.style.transform = "scale(1)"; // Reset scale
      }
    }
  }, [isEnterPressed]);

  return (
    <div className="App">
      {/* <ColorSwatch /> */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Hey! spill some colors here..."
          id="searchInput"
          style={{ width: "300px" }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
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
      <div className="title-bar">
        {/* <div className="logo"></div> */}
        {/* <GradientVideoDownloader duration={10} /> */}
      </div>
    </div>
  );
}

export default App;
