import React from 'react'
import { push as Menu } from 'react-burger-menu'
import close from '../../../asset/left-arrow.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleLeft, faHome, faUserGraduate, faChalkboardTeacher, faCalendar, faBook, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      sidebar:[]
    }
  }
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  closeMenu () {
    this.setState({menuOpen: false})
  }
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }
  logOutHandler = async() =>{
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    await axios.post('http://127.0.0.1:8000/api/admin-logout', {headers}).then(res=>console.log(res)).catch(err=>console.log(err))
    localStorage.clear()
    window.location.href = '/admin-login'
  }
 
  render () {
    return (
      <div className="sidebar-menu">
      <Menu 
        width='85%'
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        customCrossIcon= {false}
      >
        <div className="title-sidebar">
          <h1>{this.props.sidtitle}</h1>
        </div>  
        {/* <img src={close} alt="" className="close-button" onClick={() => this.toggleMenu()}/> */}
        <FontAwesomeIcon icon={faAngleLeft} className="close-button" onClick={() => this.toggleMenu()}/> 
        <span className="title-underline"></span>
        
        <div className="daftar-sidebar">
        <Link to="/admin-dashboard">
          <FontAwesomeIcon icon={faHome} className="home-icon"/>
          <div className="menu-item">Admin Dashboard</div> <br/>
        </Link>
        <Link to="/students">
          <FontAwesomeIcon icon={faUserGraduate} className="user-icon"/>
          <div className="menu-item">Daftar Siswa</div> <br/>
        </Link>
        <Link to="/tutors">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="teacher-icon"/>
          <div  className="menu-item">Daftar Tutor</div> <br/>
        </Link>
        <Link to="/schedules">
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/>
          <div  className="menu-item">Jadwal Les</div> <br/>
        </Link>
        <Link to="/handbooks">
          <FontAwesomeIcon icon={faBook} className="book-icon"/>
          <div  className="menu-item">Handbooks</div>
        </Link>
        <Link to="adminlogin">
          
          <div  className="logout" onClick={this.logOutHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="signout-icon"/>Logout</div>
        </Link>
        </div>
      </Menu>
    </div>
    );
  }
}

export default Sidebar;