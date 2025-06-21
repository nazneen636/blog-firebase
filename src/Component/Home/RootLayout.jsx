import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

const RootLayout = () => {
  return (
    <div>
     <Topbar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout
