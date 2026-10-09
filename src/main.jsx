import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Landing from './Landing.jsx'
import Templates from './Templates.jsx'
import Invite from './Invite.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/invite/:id" element={<Invite />} />
    </Routes>
  </BrowserRouter>
)
