import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => (
  <div>
    <Header></Header>
    <main className="p-4">
      <Outlet /> {/* Nơi route con render */}
    </main>
    <Footer></Footer>
  </div>
)

export default ClientLayout
