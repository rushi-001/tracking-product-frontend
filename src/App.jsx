import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout1 } from './layouts/Layout1'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { SignUp } from './views/SignUp'
import { Support } from './views/Support'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Home />} />
          <Route path="/shipping" element={<Login />} />
          <Route path="/tracking" element={<Login />} />
          <Route path="/account" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
