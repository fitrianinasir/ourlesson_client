import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import './AdminLogin.css'
import swal from 'sweetalert';
import axios from 'axios'
import '../../../asset/css/sb-admin-2.min.css'

class SignIn extends Component{
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = {
        immediate:true,
        setFocusOnError:true,
        clearInputOnReset:false,
    }
  }

  handleSubmit = async(e, formData, inputs) => {
    e.preventDefault()
    let loginAdmin = {
      username : formData.username,
      password : formData.password
    }
    await axios.post('http://127.0.0.1:8000/api/admin-login', loginAdmin).then(res=>{
      localStorage.setItem('token', res.data[0].token)
      window.location.href = `/admin-dashboard`
    }).catch(err=>{
      swal({
        title: "Login gagal!",
        text: "Username atau password yang kamu masukkan salah, silahkan login kembali dengan akun yang benar",
        type: "error",
        button: true
      })
      console.log(err)
    })
    // alert(JSON.stringify(formData, null, 2));
}
    render(){
        return(
            <div className="bg-gradient-primary bg-size">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10 col-lg-12 col-md-9 signin-box" >
                    <div className="card o-hidden border-0 shadow-lg my-5">
                      <div className="card-body p-0">
                        <div className="row">
                          <div className="col-lg-6 d-none d-lg-block bg-signin-image"></div>
                          <div className="col-lg-6">
                            <div className="p-5">
                              <div className="text-center">
                                <h1 className="h2 text-gray-900 mb-4"><span style={{color:'#2986e3', fontWeight:'bold'}}>Welcome</span><span style={{color:'#fcb93a', fontWeight:'bold'}}> Admin</span></h1>
                              </div>
                              <ValidationForm 
                                onSubmit={this.handleSubmit.bind(this)}  
                                onErrorSubmit={this.handleErrorSubmit}
                                ref={this.formRef}
                                immediate={this.state.immediate}
                                setFocusOnError={this.state.setFocusOnError}>
                                <div className="form-group">
                                <TextInput
                                  name="username" 
                                  id="username" 
                                  type="text"
                                  placeholder="Username"
                                  successMessage="Looks good!"
                                  className="form-control form-control-user signin-input"
                                  errorMessage="Please enter something"
                                  required
                                />
                                </div>
                                <div className="form-group">
                                <TextInput
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  className="form-control form-control-user signin-input"
                                  errorMessage="Please enter something"
                                  required
                                />
                                </div>
                                  <button type="submit" className="btn btn-warning btn-user btn-block btn-login">
                                    Login
                                  </button>
                                <hr/>
                              </ValidationForm>
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

export default SignIn;