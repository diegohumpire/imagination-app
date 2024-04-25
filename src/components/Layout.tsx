import { Outlet } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { useApplicationStore } from "../stores/ApplicationStore";
import ParticleBackground from "./ParticleBackground";

const Layout = () => {
  const isLoading = useApplicationStore((state) => state.isLoading);

  // const settings = {
  //   canvas: {
  //     canvasFillSpace: true,
  //     useBouncyWalls: false,
  //   },
  //   particle: {
  //     particleCount: 50,
  //     color: "#ff0000",
  //     minSize: 1,
  //     maxSize: 3,
  //   },
  //   velocity: {
  //     directionAngle: 0,
  //     directionAngleVariance: 360,
  //     minSpeed: 5,
  //     maxSpeed: 5,
  //   },
  //   opacity: {
  //     minOpacity: 0.5,
  //     maxOpacity: 0.5,
  //     opacityTransitionTime: 3000,
  //   },
  // };

  const settings = {
    canvas: {
      canvasFillSpace: true,
    },
    particle: {
      particleCount: 100,
      color: "#d68c38",
      minSize: 2,
      maxSize: 4,
    },
    velocity: {
      directionAngle: 0,
      directionAngleVariance: 30,
      minSpeed: 0.2,
      maxSpeed: 4,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.5,
      opacityTransitionTime: 5000,
    },
  };

  return (
    <div className="relative">
      <div className="h-screen absolute z-30">
        <div className="absolute w-full h-full bg-black opacity-50"></div>
        <ParticleBackground settings={settings} />
      </div>
      <main className="relative z-40">
        {isLoading && <LoadingOverlay />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
