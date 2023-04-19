import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { About } from './About'

const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
