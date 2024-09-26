import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const getSocket = () => {
  return socketIO("http://localhost:5000");
};


const Home = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const socket = getSocket();

    socket.on("connected", () => {
      console.log("Socket connected");
    });

    socket.on("live-image", (data) => {
      setImageData(`data:image/jpeg;base64,${data}`);
    });

    socket.on("error", (err) => {
      console.log("Socket error: ", err);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);


  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="flex flex-col items-center">
        <div className="mb-5 space-x-2">
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">⌥</kbd>
          <kbd className="kbd">⇧</kbd>
          <kbd className="kbd">⌃</kbd>
        </div>
        <div className="w-full max-w-4xl border rounded-lg bg-base-200 p-4">
          {imageData ? (
            <img
              src={imageData}
              alt="Live Stream"
              className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
            />
          ) : (
            <p className="text-center">No image data received yet...</p>
          )}
        </div>
      </div>
    </div>

  );
}

export default Home;