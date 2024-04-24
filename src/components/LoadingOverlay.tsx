import React from "react";

export default function LoadingOverlay(): React.ReactNode {
  return (
    <div className="absolute h-screen z-50">
      <div className="absolute h-screen w-screen bg-black opacity-50"></div>
      <div className="flex h-screen w-screen justify-center items-center text-white">
        <span className="loading loading-dots w-[5rem]"></span>
      </div>
    </div>
  );
}
