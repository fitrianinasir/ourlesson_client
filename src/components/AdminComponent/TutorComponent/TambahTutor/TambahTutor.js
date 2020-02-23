import React, {Component} from 'react'
import Navbar from '../../Navbar/Navbar'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import swal from 'sweetalert';
import axios from 'axios'
import './TambahTutor.css'

class TambahTutor extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
    }
  }

  getStudentData = async(e) =>{
    e.preventDefault();
    const tutor = {
        tutor_name : e.target.elements.tutor_name.value,
        tutor_subject : e.target.elements.tutor_subject.value,
        background : e.target.elements.background.value,
        email : e.target.elements.email.value,
        phone_number : e.target.elements.phone_number.value,
    }
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    console.log('isi form individu', tutor)
    axios.post(`http://127.0.0.1:8000/api/create-tutor`, tutor, {headers}).then(res=>{
      swal({
        title: "Success!",
        text: "Your Data Has Been Saved!",
        icon: "success",
        button: "ok",
      });
      this.props.history.push("/tutors")
    }).catch(err=>{
      swal({
        title: "Failed!",
        text: "Re-check Your Data!",
        icon: "warning",
        button: "ok",
      });
    })
  }

  render(){
    return(
      <div className="add-admin-body">
      <Navbar pagetitle="Schedule"/>
      <div className="add-form-body">
        <h1 className="form-title">TAMBAH TUTOR</h1>
        <ValidationForm 
          onSubmit={this.getStudentData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
          <div className="form-group text-left">
            <label htmlFor="tutor_name">Nama Tutor</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="tutor_name" 
              name="tutor_name"
              placeholder="Nama Tutor" 
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="tutor_subject">Mata Pelajaran</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="tutor_subject" 
              name="tutor_subject"
              placeholder="Mata Pelajaran" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="background">Background</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="background" 
              name="background"
              placeholder="Background" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="email">Email</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="email" 
              name="email"
              placeholder="Email" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>          
          <div className="form-group text-left">
            <label htmlFor="phone_number">No. HP</label>
           <TextInput 
            type="number" 
            className="form-control col-lg-12 input-style" 
            id="phone_number" 
            name="phone_number"
            placeholder="No. HP" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/tutors')}>Kembali</button>   
            <button type="submit" className="btn btn-primary submit-button">Submit</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default TambahTutor