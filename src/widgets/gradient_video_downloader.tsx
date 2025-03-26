import React, { useState, useRef, useCallback } from "react";

const GradientVideoDownloader: React.FC<{ duration?: number }> = ({
  duration = 10,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(() => {
    // Early return if canvas is not available
    if (!canvasRef.current) {
      console.error("Canvas is not available");
      return;
    }

    // Reset chunks
    chunksRef.current = [];

    // Create canvas with same dimensions as window
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // Early return if context is not available
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    // Create gradient similar to body background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#e66465");
    gradient.addColorStop(1, "#4fabe4");

    // Stream canvas
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gradient-animation-${duration}s.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    // Start recording
    mediaRecorder.start();
    setIsRecording(true);

    // Animation loop
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / (duration * 1000);

      // Clear canvas
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simulate gradient animation
      const gradientPosition = Math.sin(progress * Math.PI * 2) * 100;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = `linear-gradient(45deg, #e66465 ${
        50 - gradientPosition
      }%, #4fabe4 ${50 + gradientPosition}%)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Stop recording after duration
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
      }
    };

    requestAnimationFrame(animate);
  }, [duration]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
        }}
      />
      <button
        className="download-button"
        onClick={startRecording}
        disabled={isRecording}
        style={{
          padding: "10px 20px",
          backgroundColor: isRecording ? "#cccccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isRecording ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {isRecording ? "Recording..." : "Download Gradient Video"}
        <svg
          width="16px"
          height="16px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
        >
          <path
            d="M4 13V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V13"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 3L12 15M12 15L8.5 11.5M12 15L15.5 11.5"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      {isRecording && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            zIndex: 10,
          }}
        >
          Recording...
        </div>
      )}
    </div>
  );
};

export default GradientVideoDownloader;
