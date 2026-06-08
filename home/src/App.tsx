import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SmoothieBuilderPage from './pages/SmoothieBuilder/SmoothieBuilderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/smoothie-builder" element={<SmoothieBuilderPage />} />
    </Routes>
  )
}
