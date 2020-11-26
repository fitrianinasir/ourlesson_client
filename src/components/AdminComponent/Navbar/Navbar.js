import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';
class NavigationBar extends Component{
  
    render(){
        return(
            <Navbar className="form-page-navbar">
                <Sidebar sidtitle={this.props.pagetitle}></Sidebar>
                {/* <img src={menu} alt="" className="menu-style"/> */}
                <FontAwesomeIcon icon={faBars} className="menu-style" /> 
                <h5 className="form-page-brand" href="#home">{this.props.pagetitle}</h5>
            </Navbar>
        )
    }
}

export default NavigationBar;