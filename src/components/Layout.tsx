import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { useApplicationStore } from "../stores/ApplicationStore";
import ParticleBackground from "./ParticleBackground";
import { useAuthStore } from "../stores/AuthStore";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoading = useApplicationStore((state) => state.isLoading);
  const currentEmail = useAuthStore((state) => state.email);
  const restartSession = useAuthStore((state) => state.restartSession);
  const tries = useAuthStore((state) => state.tries);
  const totalTries = 3 - tries;

  const { pathname }: any = location;
  const showEmail = !["/", "/start"].includes(pathname);

  return (
    <div className="relative">
      <div className="w-screen h-screen absolute z-30 bg-gray-700">
        <div className="absolute w-full h-full"></div>
        <ParticleBackground />
      </div>
      <main className="relative z-40">
        {isLoading && <LoadingOverlay />}
        {showEmail && (
          <div>
            <div className="absolute top-1 right-0 z-50">
              <span
                className="text-white cursor-pointer m-2"
                onClick={() => {
                  restartSession();
                  navigate("/start");
                }}>
                Aquí para cambiar: <span className="underline">{currentEmail}</span>
              </span>
            </div>
            <div className="absolute top-1 left-0 z-50">
              <span className="text-white cursor-pointer m-2">
                <span className="text-secondary">Tienes</span>{" "}
                <span className="text-accent">{totalTries} oportunidad(es)</span>
              </span>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
