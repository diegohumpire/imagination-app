import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Start from "./pages/Start.tsx";
import Prompts from "./pages/Prompts.tsx";
import ResultPrompt from "./pages/ResultPrompt.tsx";
import Layout from "./Layout.tsx";
import Page404 from "./pages/errors/Page404.tsx";
import LoadingOverlay from "./components/LoadingOverlay.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      { path: "/", element: <Start /> },
      { path: "/choose-prompt", element: <Prompts /> },
      { path: "/prompts", element: <Prompts /> },
      { path: "/result-prompt", element: <ResultPrompt /> },
      //   { path: "*", element: <Page404 /> },
      { path: "*", element: <LoadingOverlay /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
