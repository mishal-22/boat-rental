import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './admin components/AdminHeader'
import Footer from './Footer'

function AdminLayout() {
  return (
    <>
        <AdminHeader/>
        <Outlet/>
        {/* <Footer/> */}
    </>
  )
}

export default AdminLayout;