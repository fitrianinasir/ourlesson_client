import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import Sidebar from '../SidebarStudent/SidebarStudent';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import './NavbaStudent.css'

class NavigationBar extends Component{
    componentDidMount(){
  }
    render(){
        return(
            <Navbar className="form-page-navbar">
                <Sidebar sidtitle={this.props.pagetitle} ></Sidebar>
                <FontAwesomeIcon icon={faBars} className="menu-style" /> 
                <h5 className="form-page-brand" href="#home">{this.props.pagetitle}</h5>
            </Navbar>
        )
    }
}

export default NavigationBar;