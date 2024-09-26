import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const getSocket = () => {
  return socketIO("http://localhost:5000");
};

const useSocket = () => {
  const [imageData, setImageData] = useState(null);
  const [deviceIp, setDeviceIp] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("connected", () => {
      console.log("Socket connected");
    });

    socket.on("live-image", (data) => {
      setImageData(`data:image/jpeg;base64,${data}`);
    });

    socket.on("ip", (data) => {
      if (data) {
        const splitIp = data.split(".");
        setDeviceIp(splitIp);
      }
    });

    socket.on("error", (err) => {
      console.log("Socket error: ", err);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);


  const socketInfo = {
    imageData,
    deviceIp
  };

  return socketInfo;
};

export default useSocket;