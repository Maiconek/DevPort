import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes> 
          <Route path="*" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
