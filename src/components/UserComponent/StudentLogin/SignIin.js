import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import './SignIn.css'
import '../../../asset/css/sb-admin-2.min.css'
import {CLIENT_SECRET, CLIENT_ID} from '../../BaseUrlApi/BaseUrlApi'
import axios from 'axios'
import swal from 'sweetalert';

class SignIn extends Component{
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = {
        immediate:true,
        setFocusOnError:true,
        clearInputOnReset:false,
        user_detected:''
    }
  }

  async componentDidMount(){
  }

  
  handleSubmit = async(e, formData, inputs) => {
    e.preventDefault();
    let loginData = {
      nis : formData.nis,
      password : formData.password,
      scope : '*',
      client_secret : CLIENT_SECRET,
      client_id : CLIENT_ID,
      grant_type : 'password'
    }
    console.log(loginData)
    await axios.post('http://127.0.0.1:8000/api/user-login', loginData).then(res=>{
      let nis = res.data[0].user.nis
      localStorage.setItem('studentToken', res.data[0].token)
      window.location.href = `/student-profile/${nis}`
      console.log(localStorage.getItem('studentToken'))
    }).catch(err=>{
      swal({
        title: "Login gagal!",
        text: "Username atau password yang kamu masukkan salah, silahkan login kembali dengan akun yang benar",
        type: "error",
        button: true
      })
    })
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
                                <h1 className="h2 text-gray-900 mb-4">Welcome to <span style={{color:'#2986e3', fontWeight:'bold'}}>Our</span><span style={{color:'#fcb93a', fontWeight:'bold'}}>Lesson</span></h1>
                              </div>
                              <ValidationForm 
                                onSubmit={this.handleSubmit.bind(this)}  
                                onErrorSubmit={this.handleErrorSubmit}
                                ref={this.formRef}
                                immediate={this.state.immediate}
                                setFocusOnError={this.state.setFocusOnError}>
                                <div className="form-group">
                                <TextInput
                                  name="nis" 
                                  id="nis" 
                                  type="text"
                                  placeholder="Nomor Induk Siswa"
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
                              <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
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

export default SignIn;