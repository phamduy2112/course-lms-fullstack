import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'

const ClientLayout = () => {
  return (

  <div className=' '>
  <Header/>
    <main className="container m-auto">
        <Outlet />
      </main>
      <Footer/>
  </div>

 
  )
}

export default ClientLayout