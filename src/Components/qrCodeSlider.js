import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import "./qr.css";

const QRCodeSlider = ({ intervalInSeconds, classID, token }) => {
  const [qrdata, setqrdata] = useState("");
  const [timetxt, settimetxt] = useState("");
  const [key, setKey] = useState(0);
  const [QRStatus, setQRStatus] = useState("inactive");
  const qrCodeDataMap = new Map();

  const fetchQrCodeData = async (startTime, interval) => {
    console.log("Fetching QR Code");
    console.log(classID);
    const response = await axios.get(
      `http://localhost:8080/qrDisplay/getQRCodeData/${classID}?startTime=${startTime}&interval=${interval}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
      }
    );

    console.log(response.data);
    console.log(response);
    const qrCodeDataArr = response.data;
    console.log("hello" + qrCodeDataArr[0].key);
    console.log("Mello" + qrCodeDataArr[0].value);

    for (let i = 0; i < qrCodeDataArr.length; i++) {
      qrCodeDataMap.set(qrCodeDataArr[i].key, qrCodeDataArr[i].value);
    }
  };

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(async () => {
      console.log(currentIndex);
      let time = Math.floor(new Date().getTime() / 1000).toString();
      settimetxt(time);
      const qrdataValue = qrCodeDataMap.get(time);

      if (qrdataValue === undefined) {
        console.log("repeat");
        await fetchQrCodeData(time, intervalInSeconds.toString());
      } else {
        setqrdata(qrdataValue);
      }

      currentIndex = (currentIndex + 1) % 30;
    }, intervalInSeconds * 1000);

    return () => clearInterval(interval);
  }, [intervalInSeconds, classID]);

  return (
    <div>
      <div>
        <QRCode
          size={256}
          key={key}
          style={{ height: "auto", width: "60%" }}
          value={qrdata}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default QRCodeSlider;
