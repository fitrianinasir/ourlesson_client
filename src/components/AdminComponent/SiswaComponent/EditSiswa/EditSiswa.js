import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
import Navbar from '../../Navbar/Navbar'
import './EditSiswa.css'

class EditSiswa extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
      nis:'',
      student_name:'',
      birthplace:'',
      birthdate:null,
      address:'',
      religion:'',
      gender:'',
      student_class:'',
      schools:'',
      year:null,
      email:'',
      phone_number:null
    }
  }

  async componentDidMount(){
      let studentId = this.props.match.params.value
      const headers = {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
      }
      let getStudent = await axios.get(`http://127.0.0.1:8000/api/detail/${studentId}`, {headers})
      await this.setState({
        id : getStudent.data[0].id,
        nis : getStudent.data[0].nis,
        student_name: getStudent.data[0].student_name,
        birthplace : getStudent.data[0].birthplace,
        birthdate : getStudent.data[0].birthdate,
        address : getStudent.data[0].address,
        religion : getStudent.data[0].religion,
        gender : getStudent.data[0].gender,
        student_class : getStudent.data[0].student_class,
        schools : getStudent.data[0].schools,
        year : getStudent.data[0].year,
        email : getStudent.data[0].email,
        phone_number : getStudent.data[0].phone_number,
      })
      console.log(this.state.student_class)
  }

  nisHandler = async(e) => {
    await this.setState({
        nis : e.target.value
    })
    console.log(this.state.nis)
  }
  nameHandler = async(e) =>{
      await this.setState({
        student_name : e.target.value
      })
      console.log(this.state.student_name)
  }
  birthplaceHandler = async(e) => {
    await this.setState({
        birthplace : e.target.value
    })
    console.log(this.state.birthplace)
  }
  birthdateHandler = async(e) => {
    await this.setState({
        birthdate : e.target.value
    })
    console.log(this.state.birthdate)
  }
  addressHandler = async(e) => {
    await this.setState({
        address : e.target.value
    })
    console.log(this.state.address)
  }
  religionHandler = async(e) => {
    await this.setState({
        religion : e.target.value
    })
    console.log(this.state.religion)
  }
  genderHandler = async(e) => {
    await this.setState({
        gender : e.target.value
    })
    console.log(this.state.gender)
  }
  student_classHandler = async(e) => {
    await this.setState({
        student_class : e.target.value
    })
    console.log(this.state.student_class)
  }
  schoolsHandler = async(e) => {
    await this.setState({
        schools : e.target.value
    })
    console.log(this.state.schools)
  }
  yearHandler = async(e) => {
    await this.setState({
        year : e.target.value
    })
    console.log(this.state.year)
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
  passwordHandler = async(e) => {
    await this.setState({
        password : e.target.value
    })
    console.log(this.state.password)
  }

  editStudentData = async(e) =>{
    e.preventDefault();
    const fileInput = document.querySelector('#fileupload') ;

    let form_data = new FormData()
    form_data.append('_method', 'PUT');
    form_data.append('image', fileInput.files[0]);
    form_data.append('nis', this.state.nis);
    form_data.append('student_name', this.state.student_name);
    form_data.append('birthplace', this.state.birthplace);
    form_data.append('birthdate', this.state.birthdate);
    form_data.append('address', this.state.address);
    form_data.append('religion', this.state.religion);
    form_data.append('gender', this.state.gender);
    form_data.append('student_class', this.state.student_class);
    form_data.append('schools', this.state.schools);
    form_data.append('year', this.state.year);
    form_data.append('email', this.state.email);
    form_data.append('phone_number', this.state.phone_number);
    form_data.append('password',e.target.elements.password.value);

    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    
    axios.post(`http://127.0.0.1:8000/api/student-update/${this.state.id}`, form_data, {headers}).then(res=>{
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
        text: "Recheck Your Data!",
        icon: "warning",
        button: "ok",
      });
    })
    
  }

  render(){
      let {nis, student_name, birthplace, birthdate, address, religion, gender, student_class, schools, year, email, phone_number} = this.state
    return(
      <div className="add-admin-body">
        <Navbar pagetitle="Edit Siswa"/>
        <div className="add-form-body">
        <h1 className="form-title text-left">EDIT SISWA</h1>
        <ValidationForm 
          onSubmit={this.editStudentData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
          <div className="form-group text-left">
            <label>NIS</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              name="nis"
              value = {nis}
              onChange = {this.nisHandler}
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label for="student_name">Nama Siswa</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="student_name" 
              name="student_name"
              value={student_name}
              onChange={this.nameHandler}
              placeholder="Nama Siswa" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div> 
          <div className="form-group text-left">
            <label for="birthplace">Tempat Lahir</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="birthplace" 
              name="birthplace"
              value = {birthplace}
              onChange = {this.birthplaceHandler}
              placeholder="Tempat Lahir" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="Birthdate">Tanggal Lahir</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="Birthdate" 
              name="birthdate"
              value = {birthdate}
              onChange = {this.birthdateHandler}
              placeholder="Tanggal Lahir" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="Address">Alamat</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="Address" 
              name="address"
              value = {address}
              onChange = {this.addressHandler}
              placeholder="Alamat" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="religion">Agama</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="religion" 
              name="religion"
              value = {religion}
              onChange = {this.religionHandler}
              placeholder="Agama" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="gender">Jenis Kelamin</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="gender" 
              name="gender"
              value = {gender}
              onChange = {this.genderHandler}
              placeholder="Jenis Kelamin" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="class">Kelas Les</label>
           <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="class" 
              name="class"
              value = {student_class}
              onChange = {this.student_classHandler}
              placeholder="Kelas Les" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label for="school">Asal Sekolah</label>
           <TextInput 
            type="text" 
            className="form-control col-lg-12 input-style" 
            id="school" 
            name="school"
            value = {schools}
            onChange = {this.schoolsHandler}
            placeholder="Asal Sekolah" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left">
            <label for="year">Angkatan</label>
           <TextInput 
            type="text" 
            className="form-control col-lg-12 input-style" 
            id="year" 
            name="year"
            value = {year}
            onChange = {this.yearHandler}
            placeholder="Angkatan" 
            successMessage="Looks good!" 
            errorMessage="Please enter something" 
            required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="year">Foto Profile</label> <br/>
            <input type="file"  id="fileupload" name="image"/>
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
          <div className="form-group text-left">
            <label htmlFor="password">Password</label>
           <TextInput 
              type="password" 
              className="form-control col-lg-6 input-style" 
              id="password" 
              name="password"
              placeholder="Password" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div> 
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/students')}>Kembali</button>
          <button type="submit" class="btn btn-primary submit-button">Submit</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default EditSiswa