import React, {Component} from 'react'
import Navbar from '../../Navbar/Navbar'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import axios, { post } from 'axios'
import swal from 'sweetalert';
import './TambahSiswa.css'

class TambahSiswa extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
      image:null
    }
  }

  handleImageChange = async(e) => {
    await this.setState({
      image: e.target.files[0]
    })
  };

  getStudentData = async(e) =>{
    e.preventDefault();
    const fileInput = document.querySelector('#fileupload') ;
    let form_data = new FormData();
    form_data.append('image', fileInput.files[0]);
    form_data.append('nis', e.target.elements.nis.value);
    form_data.append('student_name', e.target.elements.student_name.value);
    form_data.append('birthplace', e.target.elements.birthplace.value);
    form_data.append('birthdate', e.target.elements.birthdate.value);
    form_data.append('address', e.target.elements.address.value);
    form_data.append('religion', e.target.elements.religion.value);
    form_data.append('gender', e.target.elements.gender.value);
    form_data.append('student_class', e.target.elements.class.value);
    form_data.append('schools', e.target.elements.school.value);
    form_data.append('year', e.target.elements.year.value);
    form_data.append('email', e.target.elements.email.value);
    form_data.append('phone_number', e.target.elements.phone_number.value);
    form_data.append('password', e.target.elements.password.value);
    form_data.append('client_id', 2);
    form_data.append('client_secret', 'ONRuqp2ankgbMF6tUi5egkERmK7rQLXTotsVwnqH');
    
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    
      console.log(form_data)
      axios.post(`http://127.0.0.1:8000/api/register`, form_data, {headers}).then(res=>{
        swal({
          title: "Success!",
          text: "Your Data Has Been Saved!",
          icon: "success",
          button: "ok",
        });
        this.props.history.push("/students")
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
        <h1 className="form-title text-left">TAMBAH SISWA</h1>
        <ValidationForm 
          onSubmit={this.getStudentData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
          <div className="form-group text-left">
            <label htmlFor="nis">NIS</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="nis" 
              name="nis"
              placeholder="NIS" 
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="student_name">Nama Siswa</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="student_name" 
              name="student_name"
              placeholder="Nama Siswa" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="birthplace">Tempat Lahir</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="birthplace" 
              name="birthplace"
              placeholder="Tempat Lahir" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="Birthdate">Tanggal Lahir</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="Birthdate" 
              name="birthdate"
              placeholder="Tanggal Lahir" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="Address">Alamat</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="Address" 
              name="address"
              placeholder="Alamat" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="religion">Agama</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="religion" 
              name="religion"
              placeholder="Agama" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="gender">Jenis Kelamin</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="gender" 
              name="gender"
              placeholder="Jenis Kelamin" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="class">Kelas Les</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="class" 
              name="class"
              placeholder="Kelas Les" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="school">Asal Sekolah</label>
           <TextInput 
            type="text" 
            className="form-control col-lg-12 input-style" 
            id="school" 
            name="school"
            placeholder="Asal Sekolah" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="year">Angkatan</label>
           <TextInput 
            type="text" 
            className="form-control col-lg-12 input-style" 
            id="year" 
            name="year"
            placeholder="Angkatan" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left"> <br/>
            <label htmlFor="year">Foto Profile</label><br/>
            <input type="file"  id="fileupload" name="image" />
          </div>
          <div className="form-group text-left">
            <label htmlFor="email">Email</label>
           <TextInput 
            type="email" 
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
          <div className="form-group text-left">
            <label htmlFor="password">Password</label>
           <TextInput 
              type="password" 
              className="form-control col-lg-12 input-style" 
              id="password" 
              name="password"
              placeholder="Password" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>       
            <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/students')}>Kembali</button>   
            <button type="submit" className="btn btn-primary submit-button">Kirim</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default TambahSiswa