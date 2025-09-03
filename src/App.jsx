
import MainLayout from "./layouts/MainLayout"
import CardsPage from "./pages/CardsPage"
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from "react-router-dom"
import UploadPage from "./pages/Upload"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<UploadPage />} />
      <Route path="cards/:id" element={<CardsPage />} />
    </Route>
  )
)


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App