import { Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import Repo from '@pages/Repo'

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:owner/:repo" element={<Repo />} />
    </Routes>
  )
}
