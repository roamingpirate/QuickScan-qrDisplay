import React, { useState, useEffect } from "react";
import "../App.css";

const CountdownTimer = ({ startTime, duration, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - startTime;
      const remainingTime = duration * 60 - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        onFinish(false);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h2 className="abril-fatface-regular">
        Time Left: {minutes} min {seconds} sec
      </h2>
    </div>
  );
};

export default CountdownTimer;
