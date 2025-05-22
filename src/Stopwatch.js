import React, { useState, useEffect, useRef } from "react";
import ActivityHistory from "./ActivityHistory";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("stopwatch-history");
    return saved ? JSON.parse(saved) : [];
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem("stopwatch-history", JSON.stringify(history));
  }, [history]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    const entry = {
      id: Date.now(),
      duration: formatTime(time),
      timestamp: new Date().toLocaleString(),
    };
    setHistory([entry, ...history]);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="stopwatch-container">
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      <ActivityHistory history={history} />
    </div>
  );
};

export default Stopwatch;
