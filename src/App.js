import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "./App.css";
import axios from "axios";
import QRCodeSlider from "./Components/qrCodeSlider";
import Login from "./Components/login";
import CountdownTimer from "./Components/timer";

function App() {
  const [accessCode, setAccessCode] = useState(null);

  const [subject, setSubject] = useState("");
  const [classCode, setClassCode] = useState("");
  const [qrData, setQRData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [classID, setClassID] = useState("");
  const [token, settoken] = useState("");
  const intervalInSeconds = 2;
  const [QRStatus, setQRStatus] = useState(false);
  const [qrActivationTime, setqrActivationTime] = useState(false);
  const [duration, setDuration] = useState(false);

  const findClassData = async (classID, token) => {
    console.log("mamamia");
    console.log(classID);
    if (classID && token) {
      const response = await axios.get(
        `http://localhost:8080/class/` + classID,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        }
      );

      const classData = response.data;
      console.log(response.data);
      setqrActivationTime(classData.QRActivationTime);
      setDuration(classData.duration);
      setClassCode(classData.classCode);
      setSubject(classData.className);
      setQRStatus(QRStatus === "inactive" ? false : true);
    }
  };

  const OnLogin = (classID, token) => {
    console.log(classID);
    setClassID(classID);
    settoken(token);
    setIsLoggedIn(true);
    findClassData(classID, token);
  };

  const QRDisplay = () => {
    return (
      <div className="container">
        <div className="content">
          <h1 className="just-me-again-down-here-regular">QuickScan</h1>
          <h2 className="abril-fatface-regular">{subject}</h2>
          <h2 className="abril-fatface-regular">{classCode}</h2>
          <div>
            {QRStatus ? (
              <QRCodeSlider
                intervalInSeconds={intervalInSeconds}
                classID={classID}
                token={token}
              />
            ) : (
              <h2> QR is Inactive</h2>
            )}
          </div>
          <CountdownTimer
            startTime={qrActivationTime}
            duration={duration}
            onFinish={setQRStatus}
          />
        </div>
      </div>
    );
  };

  return isLoggedIn ? <QRDisplay /> : <Login onLogin={OnLogin} />;
}

export default App;
