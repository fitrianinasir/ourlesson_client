import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import '../../asset/css/sb-admin-2.min.css'

class Login extends Component{

  async componentDidMount(){
  }

  
      render(){
        return(
            <div className="bg-gradient-primary bg-size">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10 col-lg-12 col-md-9 login-box" >
                    <div className="card o-hidden border-0 shadow-lg my-5">
                      <div className="card-body p-0">
                        <div className="row">
                          <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                          <div className="col-lg-6">
                            <div className="p-5">
                              <div className="text-center">
                                <h1 className="h2 text-gray-900 mb-4 welcome-text">Welcome to <span style={{color:'#2986e3', fontWeight:'bold'}}>Our</span><span style={{color:'#fcb93a', fontWeight:'bold'}}>Lesson</span></h1>
                              </div>
                              <div className="login-as-admin">
                                <Link to="/admin-login">
                                  <p>Login as Admin</p>
                                </Link>
                              </div>
                              <div className="login-as-student">
                                <Link to="/student-login">
                                    <p>Login as Student</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Login;