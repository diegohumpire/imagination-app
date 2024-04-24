import { Outlet } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useApplicationStore } from "./stores/ApplicationStore";

const Layout = () => {
  const isLoading = useApplicationStore((state) => state.isLoading);

  return (
    <>
      <main>
        {isLoading && <LoadingOverlay />}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
