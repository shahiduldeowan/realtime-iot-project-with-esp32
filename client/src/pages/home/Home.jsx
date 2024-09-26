
import useSocket from "../../hooks/useSocket";



const Home = () => {
  const { imageData, deviceIp } = useSocket();

  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="flex flex-col items-center">
        <div className="mb-5 space-x-2">
          {deviceIp && deviceIp.map((ip, index) => <kbd key={index} className="kbd">{ip}</kbd>)}

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