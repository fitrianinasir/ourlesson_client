import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import Navbar from '../../Navbar/Navbar'
import axios from 'axios'
import swal from 'sweetalert';
import './EditTutor.css'

class EditSiswa extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
      tutor_name:'',
      tutor_subject:'',
      background:'',
      email:'',
      phone_number:null
    }
  }

  async componentDidMount(){
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
      let tutorId = this.props.match.params.value
      let getTutor = await axios.get(`http://127.0.0.1:8000/api/tutor/${tutorId}`, {headers})
      console.log(getTutor.data[0].data)
      await this.setState({
        id : getTutor.data[0].data.id,
        tutor_name: getTutor.data[0].data.tutor_name,
        tutor_subject:getTutor.data[0].data.tutor_subject,
        background: getTutor.data[0].data.background,
        email:getTutor.data[0].data.email,
        phone_number:getTutor.data[0].data.phone_number,
      })
      console.log(this.state.tutor_subject)
  }

  nameHandler = async(e) =>{
      await this.setState({
        tutor_name : e.target.value
      })
      console.log(this.state.tutor_name)
  }
  subjectHandler = async(e) => {
    await this.setState({
        tutor_subject : e.target.value
    })
    console.log(this.state.tutor_subject)
  }
  backgroundHandler = async(e) => {
    await this.setState({
        background : e.target.value
    })
  }
  
  emailHandler = async(e) => {
    await this.setState({
        email : e.target.value
    })
    console.log(this.state.email)
  }
  phone_numberHandler = async(e) => {
    await this.setState({
        phone_number : e.target.value
    })
    console.log(this.state.phone_number)
  }

  editTutorData = async(e) =>{
    e.preventDefault();
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    const student = {
        _method:'PUT',
        tutor_name: this.state.tutor_name,
        tutor_subject: this.state.tutor_subject,
        background: this.state.background,
        email : this.state.email,
        phone_number : this.state.phone_number,
    }
    console.log(student)
    axios.put(`http://127.0.0.1:8000/api/tutor/${this.state.id}`, student, {headers}).then(res=>{
      swal({
        title: "Sukses!",
        text: "Data Anda Telah Berhasil Disimpan!",
        icon: "success",
        button: "ok",
      });
      this.props.history.push("/tutors")
    }).catch(err=>{
      swal({
        title: "Gagal!",
        text: "Mohon Cek Ulang Data Anda!",
        icon: "warning",
        button: "ok",
      });
    })
  }

  render(){
      let {tutor_name, tutor_subject, background, email, phone_number} = this.state
    return(
      <div className="add-admin-body">
      <Navbar pagetitle="Edit Siswa"/>
      <div className="add-form-body">
        <h1 className="form-title">EDIT TUTOR</h1>
        <ValidationForm 
          onSubmit={this.editTutorData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
           <div className="form-group text-left">
            <label>Nama Tutor</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              name="tutor_name"
              value = {tutor_name}
              onChange = {this.nameHandler}
              placeholder="Nama Tutor"
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label for="student_name">Mata Pelajaran</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="tutor_subject" 
              name="tutor_subject"
              value={tutor_subject}
              onChange={this.subjectHandler}
              placeholder="Mata Pelajaran" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="background">Background</label>
           <TextInput 
            type="background" 
            className="form-control col-lg-12 input-style" 
            id="background" 
            name="background"
            value = {background}
            onChange = {this.backgroundHandler}
            placeholder="Background" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left">
            <label for="email">Email</label>
           <TextInput 
            type="email" 
            className="form-control col-lg-12 input-style" 
            id="email" 
            name="email"
            value = {email}
            onChange = {this.emailHandler}
            placeholder="Email" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left">
            <label for="phone_number">No. HP</label>
           <TextInput 
            type="number" 
            className="form-control col-lg-12 input-style" 
            id="phone_number" 
            name="phone_number"
            value = {phone_number}
            onChange = {this.phone_numberHandler}
            placeholder="No. HP" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/tutors')}>Kembali</button>
          <button type="submit" class="btn btn-primary submit-button">Submit</button>
          </ValidationForm>
        </div>
      </div>
    )
  }
}

export default EditSiswa