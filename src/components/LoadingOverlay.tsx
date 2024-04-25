import React from "react";

export default function LoadingOverlay(): React.ReactNode {
  return (
    <div className="absolute h-screen z-50">
      <div className="absolute h-screen w-screen bg-black opacity-80"></div>
      <div className="flex h-screen w-screen justify-center items-center text-white">
        <span className="loading loading-infinity w-[5rem] text-white"></span>
      </div>
    </div>
  );
}
