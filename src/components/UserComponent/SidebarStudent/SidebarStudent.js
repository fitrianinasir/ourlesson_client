import React from 'react'
import { push as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleLeft, faHome, faUserGraduate, faChalkboardTeacher, faCalendar, faBook, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import './SidebarStudent.css'
class Sidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      sidebar:[],
      nis:''
    }
  }
  async componentDidMount(){
    let nis = localStorage.getItem('nis')
    await this.setState({
      nis : nis
    })
    // console.log(this.state.nis)
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
    await axios.post('http://127.0.0.1:8000/api/logout', {headers}).then(res=>console.log(res)).catch(err=>console.log(err))
    localStorage.clear()
    window.location.href = '/student-login'
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
        <FontAwesomeIcon icon={faAngleLeft} className="close-button" onClick={() => this.toggleMenu()}/> 
        <span className="title-underline"></span>
        
        <div className="daftar-sidebar">
        <Link to={`student-profile/${this.state.nis}`}>
          <FontAwesomeIcon icon={faHome} className="home-icon"/>
          <div className="menu-item">Profil Siswa</div> <br/>
        </Link>
        <Link to="/students-list">
          <FontAwesomeIcon icon={faUserGraduate} className="user-icon"/>
          <div className="menu-item">Daftar Siswa</div><br/>
        </Link>
        <Link to="tutors-list">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="teacher-icon"/>
          <div className="menu-item">Daftar Tutor</div><br/>
        </Link>
        <Link to="/schedules-list">
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon"/>
          <div className="menu-item">Jadwal Les</div><br/>
        </Link>
        <Link to="/handbooks-list">
          <FontAwesomeIcon icon={faBook} className="book-icon"/>
          <div className="menu-item">Handbooks</div><br/>
        </Link>        
          <div className="logout" onClick={this.logOutHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="signout-icon"/>Logout</div>
        </div>
      </Menu>
    </div>
    );
  
}
}

export default Sidebar;