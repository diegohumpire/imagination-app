import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Start from "./pages/Start.tsx";
import Prompts from "./pages/Prompts.tsx";
import ResultPrompt from "./pages/ResultPrompt.tsx";
import Layout from "./components/Layout.tsx";
import Page404 from "./pages/errors/Page404.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      { path: "/", element: <Start /> },
      { path: "/choose-prompt", element: <Prompts /> },
      { path: "/prompts", element: <Prompts /> },
      { path: "/result", element: <ResultPrompt /> },
      { path: "/result-prompt", element: <ResultPrompt /> },
      { path: "*", element: <Page404 /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
