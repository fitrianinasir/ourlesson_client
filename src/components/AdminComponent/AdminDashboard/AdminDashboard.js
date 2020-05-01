import React,{Component} from 'react'
import Navbar from '../Navbar/Navbar'

import './AdminDashboard.css'
class Admin extends Component{
  render(){
    return(
      <div className="admin-dashboard">
        <Navbar pagetitle="Admin Dashboard"/>
        <h1 className="admin-page">WELCOME ADMIN</h1>
      </div>
    )
  }
}

export default Admin