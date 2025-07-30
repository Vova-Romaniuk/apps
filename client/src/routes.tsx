import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "./pages/main-page";
import Saved from "./pages/saved";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
    ],
  },
]);

export default router;
