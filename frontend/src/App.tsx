import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/search" element={<Layout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App