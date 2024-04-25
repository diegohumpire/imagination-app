import { Outlet } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { useApplicationStore } from "../stores/ApplicationStore";
import ParticleBackground from "./ParticleBackground";

const Layout = () => {
  const isLoading = useApplicationStore((state) => state.isLoading);

  return (
    <div className="relative">
      <div className="w-screen h-screen absolute z-30 bg-gray-400">
        <div className="absolute w-full h-full"></div>
        <ParticleBackground />
      </div>
      <main className="relative z-40">
        {isLoading && <LoadingOverlay />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
